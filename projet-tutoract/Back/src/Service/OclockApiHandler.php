<?php

namespace App\Service;

use Symfony\Component\HttpClient\HttpClient;

class OclockApiHandler
{
 
    /**
     * HTTP Client to handle requests to API
     *
     * @var NativeHttpClient
     */
    private $client;

    /**
     * Data of the user fetched from the API
     *
     * @var array
     */
    private $details;

    /**
     * Create an instance of NativeHttpClient and store it in $this->client
     */
    public function __construct(){
        $this->client = HttpClient::create(['headers' => [
            'X-AUTH-TOKEN' => $_ENV['OCLOCK_API_TOKEN']
        ]]);
    }

    /**
     * This method take an email as parameter then check if the email is existing into the O'Clock API.
     * If it exists, the method return true, else return false
     *
     * @param string $mail
     * @return boolean
     */
    public function ApiMailCheck(string $mail) : bool
    {
        //The O'Clock API needs to be queried with POST Method with a email parameter in his body.
        $response = $this->client->request('POST', 'https://cockpit.oclock.io/api/check_email',[
            'body' => ['email' => $mail],
        ]);

        //We handle the response as an array
        $apiResponse = $response->toArray();

        //Store the user Data in $this->details
        $this->details = $apiResponse['data'];

        //We check if the email is existing in Oclock API
        $isFoundInOclockApi = $apiResponse['success'];

        return $isFoundInOclockApi;
    }

    /**
     * Get the Student Id
     *
     * @return integer
     */
    public function getStudentId(): int
    {
        return $this->details['id'];
    }

    public function getStudentNames(): array
    {
        $userApiId = $this->getStudentId();
        $response = $this->client->request('GET', 'https://cockpit.oclock.io/api/user/'.$userApiId);
        $userInfos = $response->toArray();
        
        $names = [
            'firstname' => $userInfos['data']['profile']['firstname'],
            'lastname' => $userInfos['data']['profile']['lastname']
        ];
        return $names;
    }

    /**
     * Get the Student Promo
     *
     * @return string
     */
    public function getStudentPromo(): string
    {
        $userApiId = $this->getStudentId();
        $response = $this->client->request('GET', 'https://cockpit.oclock.io/api/user/'.$userApiId.'/cohorts');
        $promoInfo = $response->toArray();
        
        $promoName = $promoInfo['data'][0]['nickname'];
        return $promoName;
    }

}