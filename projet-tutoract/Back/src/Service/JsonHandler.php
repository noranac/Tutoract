<?php

namespace App\Service;

class JsonHandler
{
    public static function clearInput(array $deserializedArray) : array
    {
        $cleanArray = [];
        foreach($deserializedArray as $key => $input){
            if($key !== "techs"){
                $input = trim($input);
                $input = htmlspecialchars($input);
            }
            
            $cleanArray[$key] = $input;
        }   

        return $cleanArray;
    }

    public static function responseHandler(bool $success, string $message, string $class) : array
    {
        $response = 
        [
            "success" => $success,
            "message" => $message,
            "severity" => $class
        ];

        return $response;
    }

    public static function clearToDeserializer(string $jsonData) : string
    {
        $requestContent = json_decode($jsonData,true);
        $requestContent = self::clearInput($requestContent);
        $requestContent = json_encode($requestContent);

        return $requestContent;
    }
    
}