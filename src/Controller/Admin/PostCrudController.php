<?php

namespace App\Controller\Admin;

use App\Entity\Post;
use DateTimeImmutable;
use Doctrine\ORM\EntityManagerInterface;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ImageField;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextEditorField;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;

class PostCrudController extends AbstractCrudController
{

    // public function __toString()
    // {
    //     return $this->title;
    // }

    // public function persistEntity(EntityManagerInterface $em, $entityInstance): void
    // {
    //     if (!$entityInstance instanceof Post) return;
    //     $entityInstance->setCreatedAt(new DateTimeImmutable());
    //     parent::persistEntity($em, $entityInstance);
    // }

    // public function updateEntity(EntityManagerInterface $em, $entityInstance): void
    // {
    //     if (!$entityInstance instanceof Post) return;
    //     $entityInstance->setUpdatedAt(new DateTimeImmutable());
    //     parent::updateEntity($em, $entityInstance);
    // }


    //on crée nos constantes

    public const POST_BASE_PATH = 'upload/images/post';

    public const POST_UPLOAD_DIR = 'public/upload/images/post';



    public static function getEntityFqcn(): string
    {
        return Post::class;
    }


    // public function configureFields(string $pageName): iterable
    //{
    //     return [
    //         IdField::new('id')->hideOnForm(),
    //         TextField::new('title', 'Titre du post'),
    //         TextEditorField::new('description', 'Description du post'),
    //         //Champs d'association avec une autre table 
    //         AssociationField::new('userPost', 'Auteur'),
    //         AssociationField::new('typePost', 'Type '),
    //         AssociationField::new('mediaPost', 'Media')->setFormTypeOption('by_reference', false),
    //         ImageField::new('imagePath', 'choisir une image')
    //             ->setBasePath(self::POST_BASE_PATH)
    //             ->setUploadDir(self::POST_UPLOAD_DIR)
    //             ->setUploadedFileNamePattern(
    //                 fn (UploadedFile $file): string => sprintf(
    //                     'upload_%d_%s.%s',
    //                     random_int(1, 999),
    //                     $file->getFilename(),
    //                     $file->guessExtension()
    //                 )
    //             ),
    //         DateField::new('datePost', 'Date du post'),
    //         //ici on cache createdAt et updatedAt on passera les données grace au persistance
    //         DateField::new('createdAt')->hideOnForm(),
    //         DateField::new('updatedAt')->hideOnForm(),

    //     ];
    // //}
}
