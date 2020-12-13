<?php

namespace App\DataFixtures\Providers;

class UserProvider extends \Faker\Provider\Base
{
    /**
     * Array of Techs
     *
     * @var array
     */
    protected static $techs = [
        'HTML',
        'CSS',
        'PHP',
        'JAVASCRIPT',
        'WORDPRESS',
        'SYMFONY',
        'REACT',
        'SOUTIEN MORAL'
    ];

    /**
     * Array of Promos
     *
     * @var array
     */
    protected static $promos = [
        'Asgard',
        'Atlantis',
        'Bifrost',
        'BigBang',
        'Cosmos',
        'Crusoe',
        'Discovery',
        'Dragons',
        'Dungeons',
        'Explorer',
        'Fusion',
        'Galaxy',
        'Hyperspace',
        'Invaders',
        'Journey',
        'Krypton',
        'Lunar',
        'Meteor',
        'Nova',
        'Orion',
        'Pulsar',
        'Quantum',
        'Rocket',
        'Sirius',
        'Titan',
        'Universe',
        'Vortex',
        'Wave',
        'X',
        'Y',
        'Zenith'
    ];

    /**
     * azerazer hashed_password
     *
     * @var string
     */
    protected static $password = '$argon2i$v=19$m=65536,t=4,p=1$UGFQc1l5NjVpek9Uc2lFLg$qMcxSvTXJuSc7i9iJs4Y2kFA9fve0A8Bs7g+RBYd6+Q';

    protected static $roles = ['ROLE_STUDENT', 'ROLE_TUTOR'];

    /**
     * return the hashed_password in fixtures
     *
     * @return string
     */
    public static function azerazerPassword(): string
    {
        return static::$password;
    }

    /**
     * Grant The ROLE_USER to every User and grant randomly the ROLE_STUDENT or the ROLE_TUTOR
     *
     * @return array
     */
    public static function studentOrTutorRole(): array
    {
        return ['ROLE_USER', static::$roles[mt_rand(0, 1)]];
    }

    public static function setPromoName(): string
    {
        return static::randomElement(static::$promos);
    }

    public static function setTechName(): string
    {
        return static::randomElement(static::$techs);
    }

    public static function setEventsOwned($roles,$events)
    {
        if(in_array('ROLE_TUTOR',$roles)){
            return [$events];
        }
        return [];
    }
}
