<?php

namespace App\Controller;

use App\Entity\Profil;
use App\Entity\User;
use App\Repository\UserRepository;
use App\Security\UserAuthenticator;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Security\Http\Authentication\UserAuthenticatorInterface;

class RegistrationController extends AbstractController
{
    #[Route('/register', name: 'app_register', methods: ['POST'])]
    public function register(
        Request $request,
        UserPasswordHasherInterface $userPasswordHasher,
        UserAuthenticatorInterface $userAuthenticator,
        UserAuthenticator $authenticator,
        EntityManagerInterface $entityManager
    ): Response {
        //on récupère les datas envoyées par le front
        $data = json_decode($request->getContent(), true);
        //on crée un nouvel utilisateur
        $user = new User();
        //on lui set les paramètres
        $user->setEmail($data['email']);
        $user->setPseudo($data['pseudo']);
        $user->setPassword(
            $userPasswordHasher->hashPassword(
                $user,
                $data['password']
            )
        );
        //on persiste l'utilisateur
        $entityManager->persist($user);

        //on crée un profil reliée au user
        $profil = new Profil();
        $profil->setUser($user);
        $profil->setBio('.....');
        $profil->setFiliere(null);
        $entityManager->persist($profil);

        //on flush
        $entityManager->flush();

        //on retourne une réponse json
        return $userAuthenticator->authenticateUser(
            $user,
            $authenticator,
            $request
        );
    }

    #[Route('/check-password', name: 'app_check_password', methods: ['GET', 'POST'])]
    public function checkPassword(
        //on récupère les données du formulaire d'encodage de mot de passe
        Request $request,
        //on récupère le service d'encodage de mot de passe
        UserPasswordHasherInterface $userPasswordHasher,
        //on récupère le repo de l'utilisateur
        UserRepository $userRepository
    ): Response {
        $data = json_decode($request->getContent(), true);
        $id = $data['id'];
        $password = $data['password'];
        $user = $userRepository->find($id);
        $isPasswordValid = $userPasswordHasher->isPasswordValid($user, $password);
        if ($isPasswordValid) {
            return $this->json([
                'message' => 'password is valid',
                'response' => true
            ]);
        } else {
            return $this->json([
                'message' => 'password is not valid',
                'response' => false
            ]);
        }
    }
}
