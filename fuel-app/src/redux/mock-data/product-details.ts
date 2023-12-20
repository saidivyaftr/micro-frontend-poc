export default {
  displayOrder: ['internet', 'phone', 'tv', 'fsecure'],
  map: {
    internet: {
      productLine: 'internet',
      description: 'Internet',
      enabled: true,
      items: [
        {
          description: 'Fiber Internet Gig Service',
          sku: 'G8002',
          price: 79.99,
        },
      ],
      hasSpeedUpgrade: false,
    },
    phone: {
      productLine: 'phone',
      description: 'Phone',
      enabled: false,
      items: [],
    },
    tv: {
      productLine: 'tv',
      description: 'Video',
      enabled: false,
      items: [],
    },
    fsecure: {
      productLine: 'fsecure',
      description: 'Frontier Secure',
      enabled: false,
      items: [],
      showMigrationBanner: 'free',
      downloadLinks: [],
    },
    hasAutopayDiscount: true,
    eligibleForAPdiscount: true,
  },
}
