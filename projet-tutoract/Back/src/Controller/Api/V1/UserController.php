<?php

namespace App\Controller\Api\V1;

use App\Entity\User;
use App\Entity\Promo;
use App\Form\AvatarType;
use App\Service\ImageUploader;
use App\Service\OclockApiHandler;
use App\Repository\TechRepository;
use App\Repository\UserRepository;
use App\Repository\PromoRepository;
use App\Service\JsonHandler;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;


/**
 * @Route("/api/v1/users", name="api_v1_users_")
 */
class UserController extends AbstractController
{

    /**
     * @Route("/", name="list", methods={"GET"})
     */
    public function list(UserRepository $userRepository, SerializerInterface $serializer)
    {
        $users = $userRepository->findAll();
        $data = $serializer->normalize($users, null, ['groups' => 'api_v1_users_infos']);
        //Ajouter le group dans Event

        return $this->json($data);
    }

    /**
     * @Route("/{id}", name="show", methods={"GET"}, requirements={"id":"\d+"})
     */
    public function show(User $user, SerializerInterface $serializer)
    {
        $data = $serializer->normalize($user, null, ['groups' => 'api_v1_users_infos']);

        return $this->json($data);
    }

    /**
     * @Route("/", name="new", methods={"POST"})
     */
    public function new(Request $request, EntityManagerInterface $em, UserPasswordEncoderInterface $passwordEncoder, PromoRepository $promoRepository, UserRepository $userRepository, TechRepository $techRepository)
    {
        //Get the form informations and decode them as an array

        $data = json_decode($request->getContent(), true);
        $data = JsonHandler::clearInput($data);

        //Handle Exception if the email is already used in database
        $emailUsers = $userRepository->findOneBy(["email" => $data['email']]);
        if ($emailUsers != null) {
            $success = false;
            $response = JsonHandler::responseHandler($success, 'Cet adresse email possède déjà un compte','error');
            return $this->json($response);
        }

        //Create a new instance of OClockApiHandler, a service who handle all the required request to the API.
        $oclockApiHandler = new OClockApiHandler();
        $isFoundInOclockApi = $oclockApiHandler->ApiMailCheck($data['email']);

        if ($isFoundInOclockApi && $data['password'] === $data['confirm_password']) {
            $user = new User();

            $promoName = $oclockApiHandler->getStudentPromo();
            $userNames = $oclockApiHandler->getStudentNames();

            //Try to find if the student Promo already exists in Database
            $promo = $promoRepository->findOneBy(['name' => $promoName]);

            //If it exists
            if ($promo != null) {
                $user->setPromo($promo);
                /**
                 * This condition allow us to avoid some manual operations to create future promos.
                 * If a student is the first of his promo to join our app and if the promo don't already exists (N.B: we cover promo from "BigBang to Dragons"),
                 * We create the promo in our database
                 */
            } else {
                $promo = new Promo();
                $promo->setName($promoName);
                $em->persist($promo);
                $em->flush();
                $user->setPromo($promo);
            }

            $user->setEmail($data['email']);
            $user->setFirstname($userNames['firstname']);
            $user->setLastname($userNames['lastname']);
            $user->setPassword($passwordEncoder->encodePassword($user, $data['password']));
            $user->setRoles([$data['role']]);

            if (isset($data['techs'])) {
                foreach ($data['techs'] as $techId) {
                    $tech = $techRepository->find($techId);
                    $user->addTech($tech);
                }
            }

            $em->persist($user);
            $em->flush();

            $success = true;
            $response = JsonHandler::responseHandler($success, 'Inscription validée !','success');
            return $this->json($response);
        }

        $success = false;
        $response = JsonHandler::responseHandler($success, 'Cette adresse email n\'est pas autorisé à se créer un compte','error');
        return $this->json($response);
    }

    /**
     * @Route("/{id}", name="edit", methods={"PUT"}, requirements={"id":"\d+"})
     */
    public function edit(User $user, EntityManagerInterface $em, SerializerInterface $serializer, Request $request)
    {

        // Grant access to a user with a Role Admin and to the user himself
        $this->denyAccessUnlessGranted('edit', $user);

        $requestContent = JsonHandler::clearToDeserializer($request->getContent());
        
        $data = $serializer->deserialize($requestContent, 'App\Entity\User', 'json');

        if(!empty($data->getNickname())){
            $user->setNickname($data->getNickname());
        }
        if(!empty($data->getCity())){
            $user->setCity($data->getCity());
        }
                
        $user
            ->setLinkedinAccount($data->getLinkedinAccount())
            ->setGithubAccount($data->getGithubAccount())
            ->setTwitterAccount($data->getTwitterAccount())
            ->setUpdatedAt(new \DateTime);

    

        $em->flush();
        
        $success = true;
        $response = JsonHandler::responseHandler($success, 'Profil mis à jour','success');
        return $this->json($response);
    }

    /**
     * @Route("/uploadavatar", name="uploadAvatar", methods={"POST"})
     */
    public function uploadAvatar(ImageUploader $imageUploader, Request $request)
    {

        $filesArray = $request->files->get('avatar');
        if(!$filesArray['avatar']){
            $success = false;
            $response = JsonHandler::responseHandler($success, 'Vous n\'avez pas choisi d\'avatar','error');
            return $this->json($response);
        }else{
            $user = $this->getUser();
            // We set the avatar to null
            $user->setAvatar(null);
    
            $form = $this->createForm(AvatarType::class, $user, ["csrf_protection" => false]);
    
            // We connect the $request oject to the form 
            $form->handleRequest($request);
    
            // if the form is submitted and valid
            if ($form->isSubmitted() && $form->isValid()) {
    
                // We implement the service & we add the avatar in the directory named avatars
                $fileName = $imageUploader->uploadFile($form['avatar']->getData(), 'avatars');
    
                // We set the avatar
                $user->setAvatar($fileName);
    
                $this->getDoctrine()->getManager()->flush();
    
                $success = true;
                $response = JsonHandler::responseHandler($success, 'Avatar mis à jour','success');
                return $this->json($response);
            }    
        }
        
        $success = false;
        $response = JsonHandler::responseHandler($success, 'Votre avatar n\'a pas pu être mis à jour','error');
        return $this->json($response);
    }

    /**
     * @Route("/{id}", name="delete", methods={"DELETE"}, requirements={"id":"\d+"})
     */
    public function delete(User $user, EntityManagerInterface $em)
    {
        // Grant access only to a user with a Role Admin
        $this->denyAccessUnlessGranted('ROLE_ADMIN');

        $em->remove($user);
        $em->flush();

        $success = true;
        $response = JsonHandler::responseHandler($success, 'Profil supprimé','success');
        return $this->json($response);
    }

    /**
     * @Route("/profile", name="profile", methods={"GET"})
     */
    public function profile(SerializerInterface $serializer)
    {
        $user = $this->getUser();
        $data = $serializer->normalize($user, null, ['groups' => 'api_v1_users_infos']);

        return $this->json($data);
    }
}
