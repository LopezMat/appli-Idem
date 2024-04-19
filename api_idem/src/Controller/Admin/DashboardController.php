<?php

namespace App\Controller\Admin;

use App\Entity\User;
use App\Entity\Filiere;
use App\Entity\Competences;
use App\Controller\Admin\UserCrudController;
use App\Entity\Media;
use App\Entity\Post;
use App\Entity\TypeContact;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Config\MenuItem;
use EasyCorp\Bundle\EasyAdminBundle\Config\Dashboard;
use EasyCorp\Bundle\EasyAdminBundle\Router\AdminUrlGenerator;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractDashboardController;

class DashboardController extends AbstractDashboardController
{

    public function __construct(
        private AdminUrlGenerator $adminUrlGenerator
    ) {
    }

    #[Route('/admin', name: 'admin')]
    public function index(): Response
    {

        $url = $this->adminUrlGenerator
            ->setController(CompetencesCrudController::class)
            ->generateUrl();

        return $this->redirect($url);

        // Option 1. You can make your dashboard redirect to some common page of your backend
        //
        // $adminUrlGenerator = $this->container->get(AdminUrlGenerator::class);
        // return $this->redirect($adminUrlGenerator->setController(OneOfYourCrudController::class)->generateUrl());

        // Option 2. You can make your dashboard redirect to different pages depending on the user
        //
        // if ('jane' === $this->getUser()->getUsername()) {
        //     return $this->redirect('...');
        // }

        // Option 3. You can render some custom template to display a proper dashboard with widgets, etc.
        // (tip: it's easier if your template extends from @EasyAdmin/page/content.html.twig)
        //
        // return $this->render('some/path/my-dashboard.html.twig');
    }

    public function configureDashboard(): Dashboard
    {
        return Dashboard::new()
            ->setTitle('<img src="/images/artiste.jpg" style="width: 30px; height: 30px;"><span> Gestion de l\'application</span>')
            ->setFaviconPath('/images/artiste.jpg');
    }

    public function configureMenuItems(): iterable
    {
        //Section pricipale
        yield MenuItem::section('Principale');
        //liste des sous menu
        yield MenuItem::subMenu('Compétences', 'fas fa-briefcase')->setSubItems([
            MenuItem::linkToCrud('Ajouter des competences', 'fas fa-briefcase', Competences::class)->setAction(Crud::PAGE_NEW),
            MenuItem::linkToCrud('Liste des competences', 'fas fa-briefcase', Competences::class),
        ]);
        yield MenuItem::subMenu('Filières', 'fas fa-project-diagram')->setSubItems([
            MenuItem::linkToCrud('Ajouter des filieres', 'fas fa-project-diagram', Filiere::class)->setAction(Crud::PAGE_NEW),
            MenuItem::linkToCrud('Liste des filieres', 'fas fa-project-diagram', Filiere::class),
        ]);
        yield MenuItem::subMenu('Media', 'fas fa-images')->setSubItems([
            MenuItem::linkToCrud('Ajouter des media', 'fas fa-images', Media::class)->setAction(Crud::PAGE_NEW),
            MenuItem::linkToCrud('Liste des media', 'fas fa-images', Media::class),
        ]);
        yield MenuItem::subMenu('Type de contact', 'fas fa-phone')->setSubItems([
            MenuItem::linkToCrud('Ajouter des type de contact', 'fas fa-phone', TypeContact::class)->setAction(Crud::PAGE_NEW),
            MenuItem::linkToCrud('Liste des type de contact', 'fas fa-phone', TypeContact::class),
        ]);
        // yield MenuItem::subMenu('Utilisateurs', 'fas fa-user', User::class)->setSubItems([

        //     MenuItem::linkToCrud('Ajouter des utilisateurs', 'fas fa-user', User::class)->setAction(Crud::PAGE_NEW),
        //     MenuItem::linkToCrud('Liste des utilisateurs', 'fas fa-user', User::class),

        // ]);
    }
}
