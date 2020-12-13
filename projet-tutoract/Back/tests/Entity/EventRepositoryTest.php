<?php 

namespace App\Tests\Entity;

use App\Entity\Event;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;



class EventRepositoryTest extends KernelTestCase
{
    /**
     * @var \Doctrine\ORM\EntityManager
     */
    private $entityManager;

    protected function setUp(): void
    {
        $kernel = self::bootKernel();

        $this->entityManager = $kernel->getContainer()
            ->get('doctrine')
            ->getManager();
    }

    public function testSearchByDescription()
    {
        $event = $this->entityManager
            ->getRepository(Event::class)
            ->findOneBy(['description' => 'Aut porro sed magni cupiditate.'])
        ;
        
        // the id of this event is 1
        $this->assertSame(1, $event->getId());
    }

    protected function tearDown(): void
    {
        parent::tearDown();

        // doing this is recommended to avoid memory leaks
        $this->entityManager->close();
        $this->entityManager = null;
    }

}