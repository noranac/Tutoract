<?php

namespace App\EventListener;

use App\Service\JsonHandler;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;

class ExceptionListener
{
    public function onKernelException(ExceptionEvent $event)
    {
        // You get the exception object from the received event
        $exception = $event->getThrowable();
        if ($exception instanceof HttpExceptionInterface) {
            if ($exception->getStatusCode() === 403 && $exception->getPrevious()->getAttributes() !== null) {
                $votersAttribute = $exception->getPrevious()->getAttributes();

                if (in_array('subscribe', $votersAttribute)) {
                    $message = sprintf(
                        'Ce cours est déjà complet',
                        $exception->getMessage(),
                        $exception->getStatusCode()
                    );
                    $success = false;
                } else if (in_array('edit', $votersAttribute)) {
                    $message = sprintf(
                        'Vous ne pouvez éditer que vos propres informations',
                        $exception->getMessage(),
                        $exception->getStatusCode()
                    );
                    $success = false;
                }
            } else {
                $message = sprintf(
                    'My Error says: %s with code: %s',
                    $exception->getMessage(),
                    $exception->getStatusCode()
                );
                $success = false;
            }

            // Customize your response object to display the exception details
            if($success){
                $class = 'success';
            }else{
                $class = 'error';
            }

            $response = new Response();
            // HttpExceptionInterface is a special type of exception that
            // holds status code and header details
            $jsonContent = JsonHandler::responseHandler($success,$message,$class);
            $jsonContent = json_encode($jsonContent);
            $response->setContent($jsonContent);
            $response->headers->set('Content-Type', 'application/json');

            // sends the modified response object to the event
            $event->setResponse($response);
        } else {
            $response = new Response();
            $response->setStatusCode(Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
