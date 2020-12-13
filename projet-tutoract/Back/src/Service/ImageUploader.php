<?php

namespace App\Service;

use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class ImageUploader
{
    private $container;

    /**
     * We create a constructor to inject a dependency in order to obtain the kernel.project_dir parameter  
     */
    public function __construct(ContainerInterface $container)
    {
        $this->container = $container;
    }

    /**
     * @var $file UploadFile from form
     * @var $localDirectory string The relative target path from the public directory
     * 
     * @return string The random filename determined the method
     */
    public function uploadFile(UploadedFile $file, string $localDirectory)
    {
        
        $targetDirectory = $this->container->getParameter('kernel.project_dir').'/public/' . $localDirectory;
        
        $targetFileName = uniqid().'.'.$file->guessExtension();
        $file->move($targetDirectory, $targetFileName);

        return $targetFileName;
    }
}