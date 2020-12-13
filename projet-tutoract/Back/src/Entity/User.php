<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\SerializedName;

/**
 * @ORM\Entity(repositoryClass="App\Repository\UserRepository")
 */
class User implements UserInterface
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups("api_v1_users")
     * @Groups({"api_v1","api_v1_promo"})
     * @Groups({"api_v1_events"})
     * @Groups({"api_v1_messages"})
     * @Groups("api_v1_users_infos")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=180, unique=true)
     * @Groups("api_v1_users_infos")
     */
    private $email;

    /**
     * @ORM\Column(type="json")
     * @Groups("api_v1_users_infos")
     */
    private $roles = [];

    /**
     * @var string The hashed password
     * @ORM\Column(type="string")
     */
    private $password;

    /**
     * @ORM\Column(type="datetime")
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $updatedAt;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups("api_v1")
     * @Groups({"api_v1_messages"})
     * @Groups("api_v1_tech_events")
     * @Groups("api_v1_users_infos")
     */
    private $avatar;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"api_v1","api_v1_promo"})
     * @Groups({"api_v1_events"})
     * @Groups({"api_v1_messages"})
     * @Groups("api_v1_tech_events")
     * @Groups("api_v1_users_infos")
     */
    private $nickname;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups( "api_v1_users")
     * @Groups({"api_v1","api_v1_promo"})
     * @Groups({"api_v1_events"})
     * @Groups({"api_v1_messages"})
     * @Groups("api_v1_tech_events")
     * @Groups("api_v1_users_infos")
     */
    private $firstname;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups( "api_v1_users")
     * @Groups({"api_v1","api_v1_promo"})
     * @Groups({"api_v1_events"})
     * @Groups({"api_v1_messages"})
     * @Groups("api_v1_tech_events")
     * @Groups("api_v1_users_infos")
     */
    private $lastname;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups("api_v1_users_infos")
     */
    private $city;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups("api_v1_users_infos")
     */
    private $linkedin_account;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups("api_v1_users_infos")
     */
    private $twitter_account;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups("api_v1_users_infos")
     */
    private $github_account;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Promo", inversedBy="users")
     * @ORM\JoinColumn(nullable=false)
     * @Groups("api_v1_users")
     * @Groups({"api_v1_events"})
     * @Groups("api_v1_tech_events")
     * @Groups("api_v1_users_infos")
     */
    private $promo;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Tech", inversedBy="users")
     * @Groups({"api_v1","api_v1_promo"})
     * @Groups({"api_v1_events"})
     * @Groups("api_v1_users_infos")
     */
    private $techs;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Event", inversedBy="users")
     * @Groups("api_v1_users_infos")
     */
    private $events;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Message", mappedBy="user")
     */
    private $messages;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Event", mappedBy="owner")
     * @Groups("api_v1_users_infos")
     */
    private $eventsOwned;

    public function __toString()
    {
        return $this->email;
    }

    public function __construct()
    {
        $this->techs = new ArrayCollection();
        $this->events = new ArrayCollection();
        $this->messages = new ArrayCollection();
        $this->eventsOwned = new ArrayCollection();
        $this->createdAt = new \DateTime();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUsername(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getPassword(): string
    {
        return (string) $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getSalt()
    {
        // not needed when using the "bcrypt" algorithm in security.yaml
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
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

    public function getAvatar(): ?string
    {
        return $this->avatar;
    }

      /**
     * @Groups("api_v1_users")
     * @SerializedName("avatar_url")
     */
    public function getAvatarUrl(): string
    {
        // Attention ici, c'est pas bon, l'url est écrite en dur, c'est à dire qu'on n'utilise pas les outils de Symfony pour retrouver le domaine et le dossier "posters"
        // On pourrait pallier à ça avec une variable d'environnement ou avec un container injecté dans l'entité.
       return 'avatars/'.$this->avatar;
    }

    public function setAvatar(?string $avatar): self
    {
        $this->avatar = $avatar;

        return $this;
    }

    public function getNickname(): ?string
    {
        return $this->nickname;
    }

    public function setNickname(?string $nickname): self
    {
        $this->nickname = $nickname;

        return $this;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): self
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): self
    {
        $this->lastname = $lastname;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(string $city): self
    {
        $this->city = $city;

        return $this;
    }

    public function getLinkedinAccount(): ?string
    {
        return $this->linkedin_account;
    }

    public function setLinkedinAccount(?string $linkedin_account): self
    {
        $this->linkedin_account = $linkedin_account;

        return $this;
    }

    public function getTwitterAccount(): ?string
    {
        return $this->twitter_account;
    }

    public function setTwitterAccount(?string $twitter_account): self
    {
        $this->twitter_account = $twitter_account;

        return $this;
    }

    public function getGithubAccount(): ?string
    {
        return $this->github_account;
    }

    public function setGithubAccount(?string $github_account): self
    {
        $this->github_account = $github_account;

        return $this;
    }

    public function getPromo(): ?Promo
    {
        return $this->promo;
    }

    public function setPromo(?Promo $promo): self
    {
        $this->promo = $promo;

        return $this;
    }

    /**
     * @return Collection|Tech[]
     */
    public function getTechs(): Collection
    {
        return $this->techs;
    }

    public function addTech(Tech $tech): self
    {
        if (!$this->techs->contains($tech)) {
            $this->techs[] = $tech;
        }

        return $this;
    }

    public function removeTech(Tech $tech): self
    {
        if ($this->techs->contains($tech)) {
            $this->techs->removeElement($tech);
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
        }

        return $this;
    }

    public function removeEvent(Event $event): self
    {
        if ($this->events->contains($event)) {
            $this->events->removeElement($event);
        }

        return $this;
    }

    /**
     * @return Collection|Message[]
     */
    public function getMessages(): Collection
    {
        return $this->messages;
    }

    public function addMessage(Message $message): self
    {
        if (!$this->messages->contains($message)) {
            $this->messages[] = $message;
            $message->setUser($this);
        }

        return $this;
    }

    public function removeMessage(Message $message): self
    {
        if ($this->messages->contains($message)) {
            $this->messages->removeElement($message);
            // set the owning side to null (unless already changed)
            if ($message->getUser() === $this) {
                $message->setUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Event[]
     */
    public function getEventsOwned(): Collection
    {
        return $this->eventsOwned;
    }

    public function addEventsOwned(Event $eventsOwned): self
    {
        if (!$this->eventsOwned->contains($eventsOwned)) {
            $this->eventsOwned[] = $eventsOwned;
            $eventsOwned->setOwner($this);
        }

        return $this;
    }

    public function removeEventsOwned(Event $eventsOwned): self
    {
        if ($this->eventsOwned->contains($eventsOwned)) {
            $this->eventsOwned->removeElement($eventsOwned);
            // set the owning side to null (unless already changed)
            if ($eventsOwned->getOwner() === $this) {
                $eventsOwned->setOwner(null);
            }
        }

        return $this;
    }
}
