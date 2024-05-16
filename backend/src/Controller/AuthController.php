<?php

namespace App\Controller;

use ApiPlatform\Metadata\Exception\HttpExceptionInterface;
use App\Entity\User;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Exception\UserNotFoundException;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;

class AuthController extends AbstractController
{
    public function __invoke(Request $request, UserProviderInterface $userProvider, UserPasswordHasherInterface $passwordHasher, JWTTokenManagerInterface $JWTManager): Response
    {
        $data = json_decode($request->getContent(), true);

        if (!isset($data['email']) || !isset($data['password'])) {
            return $this->json(['message' => 'Email et mot de passe sont obligatoires.'], Response::HTTP_BAD_REQUEST);
        }

        try {
            $user = $userProvider->loadUserByIdentifier($data['email']);
        } catch (UserNotFoundException $exception) {
            return $this->json(['message' => 'Email ou mot de passe incorrect.'], Response::HTTP_UNAUTHORIZED);
        }

        if (!$user instanceof PasswordAuthenticatedUserInterface) {
            return $this->json(['message' => 'Invalid user type.'], Response::HTTP_UNAUTHORIZED);
        }

        if (!$passwordHasher->isPasswordValid($user, $data['password'])) {
            return $this->json(['message' => 'Email ou mot de passe incorrect.'], Response::HTTP_UNAUTHORIZED);
        }

        $token = $JWTManager->create($user);

        if (empty($token)) {
            return $this->json(['message' => 'Failed to create JWT token.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json(['token' => $token]);
    }
}
