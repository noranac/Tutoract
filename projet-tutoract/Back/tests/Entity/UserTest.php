<?php 

namespace App\Tests\Entity;

use App\Entity\User;
use PHPUnit\Framework\TestCase;
use App\Service\JsonHandler;

class UserTest extends TestCase
{
    

    
    public function testToGetTheFirstname()
    {
        $user = new User();

        $user->setFirstname('Zinedine');

        $this->assertEquals($user->getFirstname(), 'Zinedine');
    }

    public function testToGetTheLastname()
    {
        $user = new User();

        $user->setLastname('Zidane');

        $this->assertEquals($user->getLastname(), 'Zidane');
    }

    public function testTheFirstnameWithJsonHandlerService()
    {
    

        $trimmedPersonalData = [
        "firstname" => 'Zinedine  ',
    ];

        $personalDataWithoutTrim = [
            "firstname" => 'Zinedine',
    ];        

        
        $this->assertEquals($personalDataWithoutTrim,JsonHandler::clearInput($trimmedPersonalData));
        

       
    }


   

   

    

}