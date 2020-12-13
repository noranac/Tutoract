<?php 

namespace App\Tests\Entity;

use App\Entity\Event;
use PHPUnit\Framework\TestCase;
use App\Service\JsonHandler;

class EventTest extends TestCase
{
    

    
    public function testToGetTheDescription()
    {
        $event = new Event();

        $event->setDescription('Cours de PHP');

        $this->assertEquals($event->getDescription(), 'Cours de PHP');
    }

   

    public function testTheDescriptionWithJsonHandlerService()
    {
    

        $trimmedEventData = [
        "description" => '  Cours de PHP  ',
    ];

        $eventWithoutTrim = [
            "description" => 'Cours de PHP',
    ];        

        
        $this->assertEquals($eventWithoutTrim,JsonHandler::clearInput($trimmedEventData));
        

       
    }


   

   

    

}