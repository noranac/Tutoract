<?php

namespace App\Tests\Service;

use App\Service\OclockApiHandler;
use PHPUnit\Framework\TestCase;

class OclockApiHandlerTest extends TestCase
{


    public function testApiMailCheck()
    {
        $ApiHandler = new OclockApiHandler();

        $this->assertIsBool($ApiHandler->ApiMailCheck('hello@sfr.fr'));
        $this->assertTrue($ApiHandler->ApiMailCheck($_ENV['MAIL_TEST_API']));
    }

    public function testGetStudentId()
    {
        $ApiHandler = new OclockApiHandler();

        $ApiHandler->ApiMailCheck($_ENV['MAIL_TEST_API']);
        $this->assertIsInt($ApiHandler->getStudentId());
    }

    public function testGetStudentNames()
    {
        $ApiHandler = new OclockApiHandler();

        $expectedResponse = [
            'firstname' => $_ENV['FIRSTNAME_TEST_API'],
            'lastname' => $_ENV['LASTNAME_TEST_API'],
        ];

        $ApiHandler->ApiMailCheck($_ENV['MAIL_TEST_API']);

        $this->assertIsArray($ApiHandler->getStudentNames());
        $this->assertEquals($expectedResponse,$ApiHandler->getStudentNames());

    }

}
