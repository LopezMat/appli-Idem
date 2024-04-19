<?php

namespace App\Repository;

use App\Entity\MessageInfo;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<MessageInfo>
 *
 * @method MessageInfo|null find($id, $lockMode = null, $lockVersion = null)
 * @method MessageInfo|null findOneBy(array $criteria, array $orderBy = null)
 * @method MessageInfo[]    findAll()
 * @method MessageInfo[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MessageInfoRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, MessageInfo::class);
    }

    //    /**
    //     * @return MessageInfo[] Returns an array of MessageInfo objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('m')
    //            ->andWhere('m.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('m.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    //    public function findOneBySomeField($value): ?MessageInfo
    //    {
    //        return $this->createQueryBuilder('m')
    //            ->andWhere('m.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}
