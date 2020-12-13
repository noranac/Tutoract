<?php

namespace App\Tests\Controller;

use DateTime;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class EventControllerTest extends WebTestCase
{

    public function testGetEventsList()
    {
        $client = static::createClient();
        
        $client->request('GET', '/api/v1/events');
        $this->assertEquals(401, $client->getResponse()->getStatusCode());

        $headers = [
            'HTTP_AUTHORIZATION' => 'Bearer '.$_ENV['JWT_TOKEN_TEST']
        ];

        $client->request('GET', '/api/v1/events/', [], [], $headers);
        
        $this->assertResponseStatusCodeSame(200);
        $this->assertJson($client->getResponse()->getContent());        
    }

    public function testGetEventShow()
    {
        $client = static::createClient();
        
        $client->request('GET', '/api/v1/events/1');
        $this->assertResponseStatusCodeSame(401);

        $headers = [
            'HTTP_AUTHORIZATION' => 'Bearer '.$_ENV['JWT_TOKEN_TEST']
        ];

        $client->request('GET', '/api/v1/events/1', [],[], $headers);
        $this->assertResponseStatusCodeSame(200);
        $this->assertJson($client->getResponse()->getContent());


    }

    public function testGetEventUsers()
    {
        $client = static::createClient();
        
        $client->request('GET', '/api/v1/events/1/users');
        $this->assertResponseStatusCodeSame(401);
        


        $headers = [
            'HTTP_AUTHORIZATION' => 'Bearer '.$_ENV['JWT_TOKEN_TEST']
        ];

        $client->request('GET', '/api/v1/events/1/users', [],[], $headers);
        $this->assertResponseStatusCodeSame(200);
        $this->assertJson($client->getResponse()->getContent());
    }

    public function testPostAddUsers()
    {
        $client = static::createClient();

        $headers = [
            'HTTP_AUTHORIZATION' => 'Bearer '.$_ENV['JWT_TOKEN_TEST'],
            'CONTENT_TYPE' => 'application/json'
        ];
        
        $client->request('POST', '/api/v1/events/2/users');
        $this->assertResponseStatusCodeSame(401);

        $client->request(
            'POST', 
            '/api/v1/events/2/users', 
            [], 
            [], 
            $headers,
            '{
                "description" : "hellomoto"
            }'
        );

        $this->assertResponseStatusCodeSame(200);

        $client->request(
            'POST', 
            '/api/v1/events/2/users', 
            [], 
            [], 
            $headers
        );

        $this->assertResponseStatusCodeSame(200);
        $this->assertJson($client->getResponse()->getContent());
        $this->assertContains('false',$client->getResponse()->getContent());
    }

    public function testPostAddEvent()
    {
        $client = static::createClient();

        $client->request('POST','/api/v1/events/');
        $this->assertResponseStatusCodeSame(401);

        $headers = [
            'HTTP_AUTHORIZATION' => 'Bearer '.$_ENV['JWT_TOKEN_TEST']
        ];

        $content = [
            "id" => 3,
            "limit" => 2,
            "date" => "2020-01-30 08:00:00",
        ];

        $jsonContent = json_encode($content);

        $client->request(
            'POST',
            '/api/v1/events/',
            [],
            [],
            $headers,
            $jsonContent
        );

        $this->assertResponseStatusCodeSame(200);
        $this->assertContains('true',$client->getResponse()->getContent());
    }

    public function testPutEditEvent()
    {
        $client = static::createClient();

        $client->request('PUT', '/api/v1/events/1');
        $this->assertResponseStatusCodeSame(401);

        $headers = [
            'HTTP_AUTHORIZATION' => 'Bearer '.$_ENV['JWT_TOKEN_TEST'],
        ];

        $content = [
            'date' => '2020-01-30 09:00:00',
            'description' => 'A brand new description'
        ];

        $jsonContent = json_encode($content);

        $client->request('PUT', '/api/v1/events/3', [], [], $headers, $jsonContent);
        $this->assertContains('false',$client->getResponse()->getContent());

        $client->request('PUT', '/api/v1/events/13', [], [], $headers, $jsonContent);
        dump($client->getResponse()->getContent());
        $this->assertContains('true',$client->getResponse()->getContent());
        
    }

}
