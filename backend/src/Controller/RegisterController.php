<?php

namespace App\Controller;

use ApiPlatform\Metadata\Exception\HttpExceptionInterface;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class RegisterController extends AbstractController {
    public function __invoke(Request $request, UserPasswordHasherInterface $passwordHasher, EntityManagerInterface $entityManager): Response {
        $data = json_decode($request->getContent(), true);
            
        // Vérifier si tous les champs sont présents
        if (!isset($data['firstname']) || !isset($data['lastname']) || !isset($data['email']) || !isset($data['password']) || !isset($data['confirmPassword'])) {
            return $this->json([
                'message' => 'Tous les champs sont obligatoires.'
            ], Response::HTTP_BAD_REQUEST);
       }


        // Vérifier si l'email existe déjà
        $existingUser = $entityManager->getRepository(User::class)->findOneBy(['email' => $data['email']]);
        if ($existingUser) {
            return $this->json([
                'message' => 'Cet email est déjà utilisé.'
            ], Response::HTTP_BAD_REQUEST);
        }

        // Vérifier si les mots de passe correspondent
        if ($data['password'] !== $data['confirmPassword']) {
            return $this->json([
                'message' => 'Les mots de passe ne correspondent pas.'
            ], Response::HTTP_BAD_REQUEST);
        }


        // vérifier que l'email est valide
        if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            return $this->json([
                'message' => 'L\'email n\'est pas valide.'
            ], Response::HTTP_BAD_REQUEST);
        }

        // Créer un nouvel utilisateur
        $user = new User();
        $user->setFirstname($data['firstname']);
        $user->setLastname($data['lastname']);
        $user->setEmail($data['email']);
        $user->setPassword($passwordHasher->hashPassword($user, $data['password']));

        $entityManager->persist($user);
        $entityManager->flush();

        return $this->json($user, Response::HTTP_CREATED);
    }
}