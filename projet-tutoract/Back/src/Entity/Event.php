<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass="App\Repository\EventRepository")
 */
class Event
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"api_v1_events"})
     * @Groups("api_v1_tech_events")
     * @Groups("api_v1_users_infos")
     * @Groups({"api_v1_messages"})
     */
    private $id;

    /**
     * @ORM\Column(type="datetime")
     * @Groups("api_v1_tech_events")
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $updatedAt;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"api_v1_events"})
     * @Groups("api_v1_users_infos")
     * @Groups("api_v1_tech_events")
     */
    private $date;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"api_v1_events"})
     * @Groups("api_v1_tech_events")
     * @Groups("api_v1_users_infos")
     */
    private $description;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\User", mappedBy="events")
     * @Groups({"api_v1_events"})
     * @Groups({"api_v1_users"})
     * @Groups("api_v1_tech_events")
     */
    private $users;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Tech", inversedBy="events")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"api_v1_events"})
     * @Groups("api_v1_users_infos")
     * 
     */
    private $tech;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="eventsOwned")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"api_v1_events"})
     * @Groups({"api_v1_users"})
     * @Groups("api_v1_tech_events")
     */
    private $owner;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"api_v1_events"})
     * @Groups("api_v1_tech_events")
     */
    private $studentLimit;

    public function __toString()
    {
        return $this->description;
    }

    public function __construct()
    {
        $this->users = new ArrayCollection();
        $this->createdAt = new \DateTime();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeInterface
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(?\DateTimeInterface $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): self
    {
        $this->date = $date;

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
            $user->addEvent($this);
        }

        return $this;
    }

    public function removeUser(User $user): self
    {
        if ($this->users->contains($user)) {
            $this->users->removeElement($user);
            $user->removeEvent($this);
        }

        return $this;
    }

    public function getTech(): ?Tech
    {
        return $this->tech;
    }

    public function setTech(?Tech $tech): self
    {
        $this->tech = $tech;

        return $this;
    }

    public function getOwner(): ?User
    {
        return $this->owner;
    }

    public function setOwner(?User $owner): self
    {
        $this->owner = $owner;

        return $this;
    }

    public function getStudentLimit(): ?int
    {
        return $this->studentLimit;
    }

    public function setStudentLimit(int $studentLimit): self
    {
        $this->studentLimit = $studentLimit;

        return $this;
    }
}
