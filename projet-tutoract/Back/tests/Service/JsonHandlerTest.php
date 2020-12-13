<?php

namespace App\Tests\Service;

use PHPUnit\Framework\TestCase;
use App\Service\JsonHandler;


class JsonHandlerTest extends TestCase
{
    public function testClearInput()
    {
        $arrayofDataSpaced = [
            "toto" => 3,
            "tata" => "un test",
            "Spaced" => "            ca en fait des espaces non ?              "
        ];

        $arraySpacedClean = [
            "toto" => 3,
            "tata" => "un test",
            "Spaced" => "ca en fait des espaces non ?"
        ];        

        $arrayOfScript = [
            "toot" => "<script>alert(1)</script>",
            "toto" => "untruc&unautretruc"
        ];

        $arrayScriptClean = [
            "toot" => "&lt;script&gt;alert(1)&lt;/script&gt;",
            "toto" => "untruc&amp;unautretruc"
        ];
        //clearInput: Vérifier que les espaces sont bien supprimés devant et derrière la string
        $this->assertEquals($arraySpacedClean,JsonHandler::clearInput($arrayofDataSpaced));
        //Vérifier que les caracteres html sont bien transformés
        $this->assertEquals($arrayScriptClean,JsonHandler::clearInput($arrayOfScript));
        
    }

    public function testResponseHandler()
    {
        $expectedResponse = 
        [
            "success" => true,
            "message" => "Le test est validé !"
        ];
        //responseHandler: vérifier que les propriétés passées retourne bien la bonne structure
        $this->assertEquals($expectedResponse,JsonHandler::responseHandler(true,"Le test est validé !",'success'));
    }

    public function testclearToDeserializer()
    {
        //vérifier que la valeur retourné est bien une string
        $this->assertEquals(
            '{"toto":"tata","tutu":"titi"}',
            JsonHandler::clearToDeserializer('{"toto":"tata","tutu":"titi"}')
        );
        //vérifier que la valeur retourné à bien été trim
        $this->assertEquals(
            '{"toto":"tata","tutu":"titi"}',
            JsonHandler::clearToDeserializer('{"toto":"          tata        ","tutu":"titi"}')
        );
        //vérifier que les caractères spéciaux ont bien été transformés
        $this->assertEquals(
            '{"toto":"&lt;script&gt;alert(1)&lt;\/script&gt;","tutu":"untruc&amp;unautretruc"}',
            JsonHandler::clearToDeserializer('{"toto":"<script>alert(1)</script>","tutu":"untruc&unautretruc"}'));
    }
}
