<?php

namespace App\Tests\UserRouteTest;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class UserRouteTest extends WebTestCase
{
    
    
    public function testAdminUserRoute()
    {
        $client = static::createClient();
         $crawler = $client->request('GET', '/admin', [], [], [
            'PHP_AUTH_USER' => 'nora.naceri90@gmail.com ',
            'PHP_AUTH_PW' => 'azerazer',
        ]);
        // We have a redirection to the route /login before to have access to /admin
        $this->assertResponseRedirects();
    }

    public function testApiProfileUserWithoutToken()
    {
        $client = static::createClient();
        $crawler = $client->request('GET', '/api/v1/users/profile', [], [], [
            'PHP_AUTH_USER' => 'nora.naceri90@gmail.com ',
            'PHP_AUTH_PW' => 'azerazer',
        ]);
        // We check that we can't have access without a token
        $this->assertResponseStatusCodeSame(401);
    }

    public function testApiProfileWithToken()
    {
        $client = static::createClient();
   
        $headers = [
            'HTTP_AUTHORIZATION' => 'Bearer '.$_ENV['JWT_TOKEN_TEST']
        ];
        // We check that we can have access to the profile with a token
        $crawler = $client->request('GET', '/api/v1/users/profile', [], [], $headers);
        
        $this->assertResponseStatusCodeSame(200);
    }

    public function testApiUploadAvatarWithoutToken()
    {
        $client = static::createClient();
       
        // We check that we can't add an avatar  without a token
        $crawler = $client->request('POST', '/api/v1/users/uploadavatar', [], [],
        [
            'PHP_AUTH_USER' => 'nora.naceri90@gmail.com ',
            'PHP_AUTH_PW' => 'azerazer',
        ]);
        
        $this->assertResponseStatusCodeSame(401);
    }


    public function testApiUploadAvatarWithToken()
    {
        $client = static::createClient();
     
        $headers = [
            'HTTP_AUTHORIZATION' => 'Bearer '.$_ENV['JWT_TOKEN_TEST']
        ];
        // We check that we can add an avatar with a token
        $crawler = $client->request('POST', '/api/v1/users/uploadavatar', [], [], $headers);
        
        $this->assertResponseStatusCodeSame(200);
    }
   

}
