<?php

namespace App\Form;

use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\FileType;

class AvatarType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            // ->add('email')
            // ->add('roles')
            // ->add('password')
            // ->add('createdAt')
            // ->add('updatedAt')
             ->add('avatar', FileType::class, [
                'attr' => [
                    'accept' => '.jpg,.jpeg,.png'
                ],
                'mapped' => true,
                'required' => false,
            ])
            // ->add('nickname')
            // ->add('firstname')
            // ->add('lastname')
            // ->add('city')
            // ->add('linkedin_account')
            // ->add('twitter_account')
            // ->add('github_account')
            // ->add('promo')
            // ->add('techs')
            // ->add('events')
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => User::class, 
            'csrf_protection' => false
        ]);
    }
}
