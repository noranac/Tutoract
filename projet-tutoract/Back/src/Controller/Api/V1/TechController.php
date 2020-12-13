<?php

namespace App\Controller\Api\V1;

use App\Entity\Tech;
use App\Form\TechType;
use App\Repository\TechRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;



/**
     * @Route("/api/v1/techs", name="api_v1_techs_")
     */
class TechController extends AbstractController
{
    /**
     * @Route("/", name="list" , methods={"GET"})
     */
    public function list(TechRepository $techRepository, SerializerInterface $serializer)
    {
      $techs = $techRepository->findAll();
      $data = $serializer->normalize($techs, null, ['groups' => 'api_v1_tech']);

      return $this->json($data);
    }


    /**
     * @Route("/{id}", name="show", methods={"GET"}, requirements={"id":"\d+"})
     */
    public function show(Tech $tech, SerializerInterface $serializer)
    {
        $data = $serializer->normalize($tech, null, ['groups' => ['api_v1_tech']]);

        return $this->json($data);
    }


    /**
     * @Route("/{id}/users", name="users", methods={"GET"}, requirements={"id":"\d+"})
     */
    public function users(Tech $tech, SerializerInterface $serializer)
    {
        $data = $serializer->normalize($tech, null, ['groups' => ['api_v1_tech','api_v1_users']]);
        
        return $this->json($data);
    }

     /**
     * @Route("/{id}/events", name="events", methods={"GET"}, requirements={"id":"\d+"})
     */
    public function events(Tech $tech, SerializerInterface $serializer)
    {

        $data = $serializer->normalize($tech, null, ['groups' => ['api_v1_tech_events']]);
        
        return $this->json($data);
    }

}
