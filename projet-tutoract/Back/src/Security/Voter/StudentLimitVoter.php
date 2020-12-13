<?php

namespace App\Security\Voter;

use App\Entity\Event;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\User\UserInterface;

class StudentLimitVoter extends Voter
{
    protected function supports($attribute, $subject)
    {
       if(in_array($attribute,['subscribe']) && $subject instanceof Event){
           return true;
       }else{
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

        $numberOfStudent = count($subject->getUsers());

        // ... (check conditions and return true to grant permission) ...
        switch ($attribute) {
            case 'subscribe':
                
                if($numberOfStudent < $subject->getStudentLimit()){
                    return true;
                }

                break;
        }

        return false;
    }
}
