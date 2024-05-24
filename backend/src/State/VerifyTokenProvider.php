<?php

namespace App\State;

use App\Dto\VerifyTokenDto;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;

class VerifyTokenProvider implements ProviderInterface
{
    public function __construct(
        private ProviderInterface $itemProvider,
    )
    {}

    public function provide(Operation $operation, array $uriVariables = [], array $context = []): object
    {
        return new VerifyTokenDto();
    }
}
