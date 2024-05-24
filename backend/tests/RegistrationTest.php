<?php

namespace App\Tests;

use ApiPlatform\Symfony\Bundle\Test\ApiTestCase;
use App\Entity\User;

class UserRegistrationTest extends ApiTestCase {
    private $createdUserEmail = 'test@example.com';

    public function testUserRegistration(): void {
        try {
            $response = static::createClient()->request('POST', '/api/register', [
                'json' => [
                    'email' => 'test@example.com',
                    'password' => '',
                    'confirmPassword' => 'password123',
                    'firstname' => 'John',
                    'lastname' => 'Doe'
                ],
                'headers' => [
                    'Content-Type' => 'application/ld+json',
                ]
            ]);
    
            $this->assertResponseStatusCodeSame(201);
            $this->assertJsonContains([
                'email' => 'test@example.com'
            ]); 
        } catch (\Exception $e) {
            throw $e;
        } finally {
            // Supprime l'utilisateur créé
            $user = static::getContainer()->get('doctrine')->getRepository(User::class)->findOneBy(['email' => 'test@example.com']);
            if ($user) {
                static::getContainer()->get('doctrine')->getManager()->remove($user);
                static::getContainer()->get('doctrine')->getManager()->flush();
            }
        }
    }
    
}

?>
