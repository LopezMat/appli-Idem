<?php

namespace App\Entity;

use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\PostRepository;
use ApiPlatform\Metadata\ApiResource;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;

#[ORM\Entity(repositoryClass: PostRepository::class)]
#[ApiResource]

class Post
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $titre = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $texte = null;

    #[ORM\Column(length: 255)]
    private ?string $type = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTimeInterface $dateCreation = null;

    #[ORM\Column(type: Types::DATE_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $dateMaj = null;

    /**
     * @var Collection<int, Media>
     */
    #[ORM\OneToMany(targetEntity: Media::class, mappedBy: 'post')]
    private Collection $mediaPost;

    #[ORM\ManyToOne(inversedBy: 'postProfil')]
    private ?Profil $profil = null;

    #[ORM\ManyToOne(inversedBy: 'posts')]
    private ?User $userPost = null;

    public function __construct()
    {
        $this->mediaPost = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitre(): ?string
    {
        return $this->titre;
    }

    public function setTitre(string $titre): static
    {
        $this->titre = $titre;

        return $this;
    }

    public function getTexte(): ?string
    {
        return $this->texte;
    }

    public function setTexte(string $texte): static
    {
        $this->texte = $texte;

        return $this;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): static
    {
        $this->type = $type;

        return $this;
    }

    public function getDateCreation(): ?\DateTimeInterface
    {
        return $this->dateCreation;
    }

    public function setDateCreation(\DateTimeInterface $dateCreation): static
    {
        $this->dateCreation = $dateCreation;

        return $this;
    }

    public function getDateMaj(): ?\DateTimeInterface
    {
        return $this->dateMaj;
    }

    public function setDateMaj(?\DateTimeInterface $dateMaj): static
    {
        $this->dateMaj = $dateMaj;

        return $this;
    }


    /**
     * @return Collection<int, Media>
     */
    public function getMediaPost(): Collection
    {
        return $this->mediaPost;
    }

    public function addMediaPost(Media $mediaPost): static
    {
        if (!$this->mediaPost->contains($mediaPost)) {
            $this->mediaPost->add($mediaPost);
            $mediaPost->setPost($this);
        }

        return $this;
    }

    public function removeMediaPost(Media $mediaPost): static
    {
        if ($this->mediaPost->removeElement($mediaPost)) {
            // set the owning side to null (unless already changed)
            if ($mediaPost->getPost() === $this) {
                $mediaPost->setPost(null);
            }
        }

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

    public function getUserPost(): ?User
    {
        return $this->userPost;
    }

    public function setUserPost(?User $userPost): static
    {
        $this->userPost = $userPost;

        return $this;
    }
}
