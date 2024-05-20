<?php

namespace App\EventListener;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTInvalidEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTExpiredEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTNotFoundEvent;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class JWTEventListener {
    public function onJWTInvalid(JWTInvalidEvent $event) {
        $response = new JsonResponse(['message' => 'Invalid token'], Response::HTTP_UNAUTHORIZED);
        $event->setResponse($response);
    }

    public function onJWTExpired(JWTExpiredEvent $event) {
        $response = new JsonResponse(['message' => 'Token has expired'], Response::HTTP_UNAUTHORIZED);
        $event->setResponse($response);
    }

    public function onJWTNotFound(JWTNotFoundEvent $event) {
        $response = new JsonResponse(['message' => 'Token not found'], Response::HTTP_UNAUTHORIZED);
        $event->setResponse($response);
    }
}
