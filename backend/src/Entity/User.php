<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Get;
use App\Controller\AuthController;
use App\Controller\RegisterController;
use App\Repository\UserRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;

#[ApiResource(
    operations: [
        new Get(),
        new Post(),
        new Get(uriTemplate: '/users/{id}'),
        new Put(),
        new Delete(),
        new Patch(),
        new Post(
            uriTemplate: '/register',
            controller: RegisterController::class,
            openapiContext: [
                'summary' => 'Register a new user',
                'description' => 'Register a new user by providing firstname, lastname, email, and password.',
                'requestBody' => [
                    'content' => [
                        'application/json' => [
                            'schema' => [
                                'type' => 'object',
                                'properties' => [
                                    'firstname' => ['type' => 'string', 'maxLength' => 255],
                                    'lastname' => ['type' => 'string', 'maxLength' => 255],
                                    'email' => ['type' => 'string', 'format' => 'email', 'maxLength' => 255],
                                    'password' => ['type' => 'string', 'minLength' => 8, 'maxLength' => 255],
                                    'confirmPassword' => ['type' => 'string', 'minLength' => 8, 'maxLength' => 255],
                                ],
                                'required' => ['firstname', 'lastname', 'email', 'password', 'confirmPassword'],
                            ],
                        ],
                    ],
                ],
            ]
        ),
        new Post(
            uriTemplate: '/login_check',
            controller: AuthController::class,
            openapiContext: [
                'summary' => 'Authenticate user and get JWT token',
                'description' => 'Authenticate user by providing email and password to get a JWT token.',
                'requestBody' => [
                    'content' => [
                        'application/json' => [
                            'schema' => [
                                'type' => 'object',
                                'properties' => [
                                    'email' => ['type' => 'string', 'format' => 'email', 'maxLength' => 255],
                                    'password' => ['type' => 'string', 'minLength' => 8, 'maxLength' => 255],
                                ],
                                'required' => ['email', 'password'],
                            ],
                        ],
                    ],
                ],
            ]
        ),
    ]
)]
#[ORM\Entity(repositoryClass: UserRepository::class)]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $firstname = null;

    #[ORM\Column(length: 255)]
    private ?string $lastname = null;

    #[ORM\Column(length: 255)]
    private ?string $email = null;

    #[ORM\Column(length: 255)]
    private ?string $password = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): static
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): static
    {
        $this->lastname = $lastname;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    public function getRoles(): array
    {
        return ['ROLE_USER'];
    }

    public function eraseCredentials(): void
    {
    }

    public function getUserIdentifier(): string
    {
        return $this->email;
    }
}
