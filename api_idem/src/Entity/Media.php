<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\MediaRepository;
use ApiPlatform\Metadata\ApiResource;

#[ORM\Entity(repositoryClass: MediaRepository::class)]
#[ApiResource()]

class Media
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $url = null;

    #[ORM\Column(length: 255)]
    private ?string $label = null;

    #[ORM\ManyToOne(inversedBy: 'mediaPost')]
    private ?Post $post = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUrl(): ?string
    {
        return $this->url;
    }

    public function setUrl(string $url): static
    {
        $this->url = $url;

        return $this;
    }

    public function getLabel(): ?string
    {
        return $this->label;
    }

    public function setLabel(string $label): static
    {
        $this->label = $label;

        return $this;
    }

    public function getPost(): ?Post
    {
        return $this->post;
    }

    public function setPost(?Post $post): static
    {
        $this->post = $post;

        return $this;
    }
}
