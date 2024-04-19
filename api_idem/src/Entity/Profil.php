<?php

namespace App\Entity;

use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\ProfilRepository;
use ApiPlatform\Metadata\ApiResource;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;

#[ORM\Entity(repositoryClass: ProfilRepository::class)]
#[ApiResource()]

class Profil
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\OneToOne(cascade: ['persist', 'remove'])]
    private ?User $user = null;

    #[ORM\ManyToOne(inversedBy: 'profils')]
    private ?Filiere $filiere = null;

    /**
     * @var Collection<int, Competences>
     */
    #[ORM\ManyToMany(targetEntity: Competences::class, inversedBy: 'profils')]
    private Collection $competences;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $bio = null;

    /**
     * @var Collection<int, Post>
     */
    #[ORM\OneToMany(targetEntity: Post::class, mappedBy: 'profil')]
    private Collection $postProfil;

    /**
     * @var Collection<int, Contact>
     */
    #[ORM\OneToMany(targetEntity: Contact::class, mappedBy: 'profil')]
    private Collection $contact;

    public function __construct()
    {
        $this->competences = new ArrayCollection();
        $this->postProfil = new ArrayCollection();
        $this->contact = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

        return $this;
    }

    public function getFiliere(): ?Filiere
    {
        return $this->filiere;
    }

    public function setFiliere(?Filiere $filiere): static
    {
        $this->filiere = $filiere;

        return $this;
    }

    /**
     * @return Collection<int, Competences>
     */
    public function getCompetences(): Collection
    {
        return $this->competences;
    }

    public function addCompetence(Competences $competence): static
    {
        if (!$this->competences->contains($competence)) {
            $this->competences->add($competence);
        }

        return $this;
    }

    public function removeCompetence(Competences $competence): static
    {
        $this->competences->removeElement($competence);

        return $this;
    }

    public function getBio(): ?string
    {
        return $this->bio;
    }

    public function setBio(string $bio): static
    {
        $this->bio = $bio;

        return $this;
    }

    /**
     * @return Collection<int, Post>
     */
    public function getPostProfil(): Collection
    {
        return $this->postProfil;
    }

    public function addPostProfil(Post $postProfil): static
    {
        if (!$this->postProfil->contains($postProfil)) {
            $this->postProfil->add($postProfil);
            $postProfil->setProfil($this);
        }

        return $this;
    }

    public function removePostProfil(Post $postProfil): static
    {
        if ($this->postProfil->removeElement($postProfil)) {
            // set the owning side to null (unless already changed)
            if ($postProfil->getProfil() === $this) {
                $postProfil->setProfil(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Contact>
     */
    public function getContact(): Collection
    {
        return $this->contact;
    }

    public function addContact(Contact $contact): static
    {
        if (!$this->contact->contains($contact)) {
            $this->contact->add($contact);
            $contact->setProfil($this);
        }

        return $this;
    }

    public function removeContact(Contact $contact): static
    {
        if ($this->contact->removeElement($contact)) {
            // set the owning side to null (unless already changed)
            if ($contact->getProfil() === $this) {
                $contact->setProfil(null);
            }
        }

        return $this;
    }
}
