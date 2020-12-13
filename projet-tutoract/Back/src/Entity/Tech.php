<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass="App\Repository\TechRepository")
 */
class Tech
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"api_v1_promo"})
     * @Groups("api_v1_tech")
     * @Groups({"api_v1_events"})
     * @Groups("api_v1_tech_events")
     * @Groups("api_v1_users_infos")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"api_v1_promo"})
     * @Groups("api_v1_tech")
     * @Groups({"api_v1_events"})
     * @Groups("api_v1_tech_events")
     * @Groups("api_v1_users_infos")
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups("api_v1_tech")
     * @Groups({"api_v1_events"})
     */
    private $description;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\User", mappedBy="techs")
     * @Groups("api_v1_users")
     */
    private $users;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Event", mappedBy="tech")
     * @Groups("api_v1_tech_events")
     */
    private $events;

    public function __toString()
    {
        return $this->name;
    }

    public function __construct()
    {
        $this->users = new ArrayCollection();
        $this->events = new ArrayCollection();
    }

    
    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    /**
     * @return Collection|User[]
     */
    public function getUsers(): Collection
    {
        return $this->users;
    }

    public function addUser(User $user): self
    {
        if (!$this->users->contains($user)) {
            $this->users[] = $user;
            $user->addTech($this);
        }

        return $this;
    }

    public function removeUser(User $user): self
    {
        if ($this->users->contains($user)) {
            $this->users->removeElement($user);
            $user->removeTech($this);
        }

        return $this;
    }

    /**
     * @return Collection|Event[]
     */
    public function getEvents(): Collection
    {
        return $this->events;
    }

    public function addEvent(Event $event): self
    {
        if (!$this->events->contains($event)) {
            $this->events[] = $event;
            $event->setTech($this);
        }

        return $this;
    }

    public function removeEvent(Event $event): self
    {
        if ($this->events->contains($event)) {
            $this->events->removeElement($event);
            // set the owning side to null (unless already changed)
            if ($event->getTech() === $this) {
                $event->setTech(null);
            }
        }

        return $this;
    }
}
