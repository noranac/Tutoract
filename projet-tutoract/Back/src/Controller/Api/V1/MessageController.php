<?php

namespace App\Controller\Api\V1;

use App\Entity\Message;
use App\Repository\MessageRepository;
use App\Service\JsonHandler;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

/**
     * @Route("/api/v1/messages", name="api_v1_messages_")
     */
class MessageController extends AbstractController
{
    /**
     * @Route("/", name="list", methods={"GET"})
     */
    public function list(MessageRepository $messageRepository, SerializerInterface $serializer)
    {

        /**
         * Get all messages from database
         */
        $messages = $messageRepository->findAll();
        $data = $serializer->normalize($messages,null, ['groups' => 'api_v1']);

        return $this->json($data);
    }

    /**
     * @param Message $message
     * @param SerializerInterface $serializer
     * @return void
     * 
     * @Route("/{id}", name="show", methods={"GET"}, requirements={"id":"\d+"})
     */
    public function show(Message $message, SerializerInterface $serializer)
    {

        /**
         * show a single message
         */
        $data = $serializer->normalize($message,null, ['groups' => 'api_v1']);

        return $this->json($data);
    }

    /**
     * @param Message $message
     * @param SerializerInterface $serializer
     * @param EntityManagerInterface $em
     * @return void
     * 
     * @Route("/{id}", name="delete", methods={"DELETE"}, requirements={"id":"\d+"})
     */
    public function delete(Message $message, SerializerInterface $serializer, EntityManagerInterface $em)
    {
        /**
         * Remove the message
         */
        $em->remove($message);
        $em->flush();
        $success = true;
        $response = JsonHandler::responseHandler($success,'Message supprimé','success');
        return $this->json($response);
    }
}
