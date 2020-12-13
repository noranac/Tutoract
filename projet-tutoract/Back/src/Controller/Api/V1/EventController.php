<?php

namespace App\Controller\Api\V1;

use App\Entity\Event;
use App\Entity\Message;
use App\Form\EventType;
use App\Service\JsonHandler;
use App\Repository\TechRepository;
use App\Repository\UserRepository;
use App\Repository\EventRepository;
use App\Repository\MessageRepository;
use Symfony\Component\Mercure\Update;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;


/**
 * @Route("/api/v1/events", name="api_v1_events_")
 */
class EventController extends AbstractController
{
    /**
     * @Route("/", name="list", methods={"GET"})
     */
    public function list(EventRepository $eventRepository, SerializerInterface $serializer)
    {
        /**
         * Get all the events from the database and normalize them
         */
        $events = $eventRepository->findAll();
        $data = $serializer->normalize($events, null, ['groups' => 'api_v1_events']);

        /**
         * Return the JSON data
         */
        return $this->json($data);
    }

    /** 
     * @Route("/{id}", name="show", methods={"GET"}, requirements={"id":"\d+"})
     */
    public function show(Event $event, SerializerInterface $serializer)
    {
        $data = $serializer->normalize($event, null, ['groups' => 'api_v1_events']);

        return $this->json($data);
    }

    /**
     * @Route("/{id}/users", name="users", methods={"GET"}, requirements={"id":"\d+"})
     */
    public function users(Event $event, SerializerInterface $serializer)
    {
        $data = $serializer->normalize($event, null, ['groups' => 'api_v1_users']);

        return $this->json($data);
    }

    /**
     * @Route("/{id}/users", name="users_new", methods={"POST"}, requirements={"id":"\d+"})
     */
    public function addUser(Event $event, SerializerInterface $serializer, UserRepository $userRepository, Request $request)
    {

        $user = $this->getUser();

        /**
         * Voters to deny access if the student limit is reached
         */
        $this->denyAccessUnlessGranted('subscribe',$event);
        
        /**
         * Check if the user is already subscribed at the event
         */
        foreach($event->getUsers() as $student){
            if($user === $student){
                $success = false;
                $response = JsonHandler::responseHandler($success,'Vous êtes déjà inscrit','error');
                return $this->json($response);
            }
        }

        /**
         * Use the JsonHandler Service to clear the inputs incoming from the form
         */
        $requestContent = JsonHandler::clearToDeserializer($request->getContent());
        $data = $serializer->deserialize($requestContent, 'App\Entity\Event', 'json');
        
        $eventDescription = $data->getDescription();

        /**
         * If a description has been setted by a student
         */
        if(!$event->getDescription()){
            if (isset($eventDescription)) {
                $event->setDescription($eventDescription);
            }
        }
        

        /**
         * Subscribe the user to the event
         */
        $event->addUser($user);
        $em = $this->getDoctrine()->getManager();
        $em->persist($event);
        $em->flush();
        $success = true;
        $response = JsonHandler::responseHandler($success,'Vous êtes bien inscrit','success');
        return $this->json($response);
        
    }

    /**
     *@Route("/", name="new", methods={"POST"})
     */
    public function new(Request $request, UserRepository $userRepository, TechRepository $techRepository)
    {
        $event = new Event();

        //At the moment we don't implement login, when it'll be fine we'll use $this->getUser()
        //So we get an arbitrary User to test the methods
        $ownerLogged = $this->getUser();

        /**
         * Here we don't use the serializer because the Event need a tech Object, and we only get the id of the tech in the form input
         * So we use the native function of PHP to handle this form.
         * We decode the json as an indexed array and get the Tech ID
         */
        $data = json_decode($request->getContent(), true);
        $data = JsonHandler::clearInput($data);
        
        $techId = $data['id'];

        /**
         * Get the correct tech using the ID decoded
         */
        $tech = $techRepository->find($techId);

        /**
         * Convert the date string into a DateTime Object
         */
        $date = new \DateTime($data['date']);
        $limit = $data['limit'];

        /**
         * create the event
         */
        $event->setOwner($ownerLogged);
        $event->setDate($date);
        $event->setTech($tech);
        $event->setStudentLimit($limit);

        $em = $this->getDoctrine()->getManager();
        $em->persist($event);
        $em->flush();

        $success = true;
        $response = JsonHandler::responseHandler($success,'Votre évènement est créé','success');
        return $this->json($response);
    }

    /**
     * @Route("/{id}", name="edit", methods={"PUT"}, requirements={"id":"\d+"})
     */
    public function edit(Event $event, Request $request, SerializerInterface $serializer, EntityManagerInterface $em, UserRepository $userRepository)
    {

        $user = $this->getUser();

        if($event->getOwner() !== $user){
            $success = false;
            $response = JsonHandler::responseHandler($success,'Vous n\'êtes pas le propriétaire de cet évènement','error');
            return $this->json($response);
        }

        $requestContent = JsonHandler::clearToDeserializer($request->getContent()); 
        $data = $serializer->deserialize($requestContent, 'App\Entity\Event', 'json');

        if(!empty($data->getDate())){
        $event->setDate($data->getDate());
        }
        if(!empty($data->getDescription())){
        $event->setDescription($data->getDescription());
        }
        $em->flush();

        $success = true;
        $response = JsonHandler::responseHandler($success,'Evènement édité','success');
        return $this->json($response);
    }

    /**
     * @Route("/{id}", name="delete", methods={"DELETE"})
     */
    public function delete(Event $event, Request $request)
    {

        $user = $this->getUser();

        if($event->getOwner() !== $user){
            $success = false;
            $response = JsonHandler::responseHandler($success,'Vous n\'êtes pas le propriétaire de cet évènement','error');
            return $this->json($response);
        }

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->remove($event);
        $entityManager->flush();

        $success = true;
        $response = JsonHandler::responseHandler($success,'Evènement supprimé','success'); 
        return $this->json($response);
    }

    /**
     * @Route("/{id}/messages", name="messages", methods={"GET"})
     */
    public function messages(Event $event, SerializerInterface $serializer, MessageRepository $messageRepository)
    {
        /**
         * get all the messages of the current event from the database
         */
        $messages = $messageRepository->findBy(['event' => $event->getId()]);
        $data = $serializer->normalize($messages, null, ['groups' => ['api_v1', 'api_v1_messages']]);

        return $this->json($data);

        // return $this->render('mercure.html.twig',[
        //     'eventId' => $event->getId(),
        // ]);
    }

    /**
     * @Route("/{id}/messages", name="messages_new", methods={"POST"}, requirements={"id":"\d+"})
     */
    public function addMessage(Event $event, SerializerInterface $serializer, Request $request)
    {

        $message = new Message();

        $user = $this->getUser();

        $requestContent = JsonHandler::clearToDeserializer($request->getContent());
        $data = $serializer->deserialize($requestContent, 'App\Entity\Message', 'json');
        /**
         * Setting the content from the request
         */
        $message->setContent($data->getContent());

        /**
         * setting the User as the current user
         */
        $message->setUser($user);

        /**
         * setting the Event as the current event
         */
        $message->setEvent($event);

        /**
         * Wrote in database
         */
        $em = $this->getDoctrine()->getManager();
        $em->persist($message);
        $em->flush();

        // $messageJson = $serializer->serialize($message, 'json', ['groups' => ['api_v1', 'api_v1_messages']]);

        // $eventId= $event->getId();
        // $update = new Update("messages-$eventId", $messageJson);
        // $bus->dispatch($update);

        $success = true;
        $response = JsonHandler::responseHandler($success,'Message envoyé','success');
        return $this->json($response);
    }
}
