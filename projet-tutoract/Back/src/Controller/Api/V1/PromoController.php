<?php

namespace App\Controller\Api\V1;

use App\Entity\Promo;
use App\Form\PromoType;
use App\Repository\UserRepository;
use App\Repository\PromoRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

/**
 * @Route("/api/v1/promos", name="api_v1_promos_")
 */
class PromoController extends AbstractController
{

    /**
     * @return void
     * 
     * @Route("/", name="list", methods={"GET"})
     */
    public function list(PromoRepository $promoRepository, SerializerInterface $serializer)
    {
        $promos = $promoRepository->findAll();
        $data = $serializer->normalize($promos,null,['groups' => 'api_v1_promo']);

        return $this->json($data);
    }

    /**
     * @Route("/{id}", name="show", methods={"GET"}, requirements={"id":"\d+"})
     */
    public function show(Promo $promo, SerializerInterface $serializer)
    {
        $data = $serializer->normalize($promo,null,['groups' => 'api_v1_promo']);

        return $this->json($data);
    }

    /**
     * @Route("/{id}/users", name="users", methods={"GET"}, requirements={"id":"\d+"})
     */
    public function users(Promo $promo, SerializerInterface $serializer, UserRepository $userRepository)
    {

        /**
         * Get all users from a promo and return the result as a JSON
         */
        $users = $userRepository->findBy(['promo' => $promo]);
        $data = $serializer->normalize($users,null,['groups' => 'api_v1_promo']);

        return $this->json($data);
    }
}
