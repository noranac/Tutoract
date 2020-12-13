<?php

namespace App\DataFixtures;


use Faker\Factory;
use App\DataFixtures\TutoractNativeLoader;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class NelmioAliceFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {        
        $loader = new TutoractNativeLoader();
        
        //importe le fichier de fixtures et récupère les entités générés
        $entities = $loader->loadFile(__DIR__.'/fixtures.yaml')->getObjects();
        
        //empile la liste d'objet à enregistrer en BDD
        foreach ($entities as $entity) {
            $manager->persist($entity);
        };
        
        //enregistre
        $manager->flush();
    }
}