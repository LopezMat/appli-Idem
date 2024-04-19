<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\ContactRepository;

#[ORM\Entity(repositoryClass: ContactRepository::class)]
#[ApiResource]

class Contact
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'contacts')]
    private ?TypeContact $typeContact = null;

    #[ORM\Column(length: 255)]
    private ?string $valeur = null;

    #[ORM\ManyToOne(inversedBy: 'contact')]
    private ?Profil $profil = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTypeContact(): ?TypeContact
    {
        return $this->typeContact;
    }

    public function setTypeContact(?TypeContact $typeContact): static
    {
        $this->typeContact = $typeContact;

        return $this;
    }

    public function getValeur(): ?string
    {
        return $this->valeur;
    }

    public function setValeur(string $valeur): static
    {
        $this->valeur = $valeur;

        return $this;
    }

    public function getProfil(): ?Profil
    {
        return $this->profil;
    }

    public function setProfil(?Profil $profil): static
    {
        $this->profil = $profil;

        return $this;
    }
}
