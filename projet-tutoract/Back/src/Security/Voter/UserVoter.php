<?php

namespace App\Security\Voter;

use App\Entity\User;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\User\UserInterface;

class UserVoter extends Voter
{
    protected function supports($attribute, $subject)
    {
        if (in_array($attribute, ['edit']) && $subject instanceof User) {
            return true;
        } else {
            return false;
        }
    }

    protected function voteOnAttribute($attribute, $subject, TokenInterface $token)
    {
        $user = $token->getUser();
        // if the user is anonymous, do not grant access
        if (!$user instanceof UserInterface) {
            return false;
        }

        // We test for each value of $attribute if the user has the access
         switch ($attribute) {
            case 'edit':
                //  We check the role of the user
                if (in_array('ROLE_ADMIN', $user->getRoles())) {
                    return true;
                }
                // We check the user himself
                if ($subject === $user) {
                    return true;
                }
                break;
        }

        return false;
    }
}
