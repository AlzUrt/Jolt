<?php

namespace App\Tests;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class RegistrationTest extends WebTestCase
{
    public function testRegister(): void
    {
        $client = static::createClient();
        $crawler = $client->request('POST', '/api/register', [], [], ['CONTENT_TYPE' => 'application/ld+json'], '{"email": "azeaze.do@exemple.com", "password": "azeaze", "confirmPassword": "azeaze", "firstname": "azeaze", "lastname": "azeaze"}');
        $this->assertResponseIsSuccessful();
        $this->assertResponseStatusCodeSame(201);

        // Suppose que l'API retourne un JSON avec l'ID de l'utilisateur dans 'id'
        $responseData = json_decode($client->getResponse()->getContent(), true);
        $userId = $responseData['id'] ?? null;

        // delete the user with doctrine
        $entityManager = $client->getContainer()->get('doctrine')->getManager();
        $userRepository = $entityManager->getRepository(User::class);
        $user = $userRepository->find($userId);
        $entityManager->remove($user);
        $entityManager->flush();
    }

    protected function tearDown(): void
    {
        while (true) {
            $previousHandler = set_exception_handler(static fn() => null);
    
            restore_exception_handler();
    
            if ($previousHandler === null) {
                break;
            }
    
            restore_exception_handler();
        }
    }
    
}

?>
