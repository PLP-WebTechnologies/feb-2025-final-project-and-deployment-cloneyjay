// Sample listings data
const listings = [
    {
        id: '1',
        title: 'Modern Studio Apartment Near UoN',
        location: 'Ngara, Nairobi',
        price: 15000,
        priceUnit: 'month',
        bedrooms: 1,
        type: 'private',
        description: 'Beautiful studio apartment perfect for students. Fully furnished with modern amenities. Walking distance to University of Nairobi main campus.',
        image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3',
        gallery: [
            'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3',
            'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3',
            'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3'
        ],
        amenities: [
            { name: 'Wi-Fi', icon: 'wifi' },
            { name: 'Security', icon: 'shield' },
            { name: 'Water', icon: 'droplet' },
            { name: 'Parking', icon: 'car' },
            { name: 'Study Area', icon: 'book' }
        ],
        reviews: [
            {
                name: 'John Doe',
                rating: 5,
                text: 'Great place to stay! Very close to campus and secure.',
                date: '2025-04-15',
                avatar: 'https://i.pravatar.cc/150?img=1'
            }
        ],
        coordinates: [-1.2921, 36.8219]
    },
    {
        id: '2',
        title: 'Spacious 2 Bedroom near JKUAT',
        location: 'Juja, Kiambu',
        price: 25000,
        priceUnit: 'month',
        bedrooms: 2,
        type: 'shared',
        description: 'Perfect for sharing! This spacious 2-bedroom apartment comes fully furnished and is located just 5 minutes from JKUAT main gate.',
        image: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?ixlib=rb-4.0.3',
        gallery: [
            'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?ixlib=rb-4.0.3',
            'https://images.unsplash.com/photo-1484101403633-562f891dc89a?ixlib=rb-4.0.3',
            'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3'
        ],
        amenities: [
            { name: 'Wi-Fi', icon: 'wifi' },
            { name: 'Security', icon: 'shield' },
            { name: 'Water', icon: 'droplet' },
            { name: 'Laundry', icon: 'wind' },
            { name: 'Study Area', icon: 'book' }
        ],
        reviews: [
            {
                name: 'Jane Smith',
                rating: 4,
                text: 'Nice and spacious. Good for sharing with a friend.',
                date: '2025-04-10',
                avatar: 'https://i.pravatar.cc/150?img=2'
            }
        ],
        coordinates: [-1.1022, 37.0145]
    },
    {
        id: '3',
        title: 'Cozy Single Room near KU',
        location: 'Kahawa, Nairobi',
        price: 12000,
        priceUnit: 'month',
        bedrooms: 1,
        type: 'private',
        description: 'Comfortable single room with private bathroom. Located in a quiet neighborhood near Kenyatta University.',
        image: 'https://images.unsplash.com/photo-1501876725168-00c445821c9e?ixlib=rb-4.0.3',
        gallery: [
            'https://images.unsplash.com/photo-1501876725168-00c445821c9e?ixlib=rb-4.0.3',
            'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3',
            'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?ixlib=rb-4.0.3'
        ],
        amenities: [
            { name: 'Wi-Fi', icon: 'wifi' },
            { name: 'Security', icon: 'shield' },
            { name: 'Water', icon: 'droplet' },
            { name: 'Kitchen', icon: 'coffee' }
        ],
        reviews: [
            {
                name: 'Mary Johnson',
                rating: 5,
                text: 'Perfect for a single student! Very clean and well-maintained.',
                date: '2025-04-05',
                avatar: 'https://i.pravatar.cc/150?img=3'
            }
        ],
        coordinates: [-1.1800, 36.9293]
    },
    {
        id: '4',
        title: 'Luxury 3 Bedroom Apartment near Strathmore',
        location: 'Madaraka, Nairobi',
        price: 45000,
        priceUnit: 'month',
        bedrooms: 3,
        type: 'shared',
        description: 'Premium 3 bedroom apartment perfect for sharing. Features modern finishes, spacious living area, and is located just 5 minutes walk from Strathmore University.',
        image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixlib=rb-4.0.3',
        gallery: [
            'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixlib=rb-4.0.3',
            'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?ixlib=rb-4.0.3',
            'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3'
        ],
        amenities: [
            { name: 'Wi-Fi', icon: 'wifi' },
            { name: 'Security', icon: 'shield' },
            { name: 'Water', icon: 'droplet' },
            { name: 'Gym', icon: 'activity' },
            { name: 'Parking', icon: 'car' },
            { name: 'Study Area', icon: 'book' }
        ],
        reviews: [
            {
                name: 'Alex Wong',
                rating: 5,
                text: 'Exceptional property! The gym is a great bonus and location is perfect.',
                date: '2025-05-01',
                avatar: 'https://i.pravatar.cc/150?img=4'
            }
        ],
        coordinates: [-1.3106, 36.8155]
    },
    {
        id: '5',
        title: 'Affordable Bedsitter near TUK',
        location: 'CBD, Nairobi',
        price: 9000,
        priceUnit: 'month',
        bedrooms: 1,
        type: 'private',
        description: 'Cozy bedsitter in the heart of CBD. Perfect for Technical University of Kenya students. Includes basic furniture and shared kitchen.',
        image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-4.0.3',
        gallery: [
            'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-4.0.3',
            'https://images.unsplash.com/photo-1505693314120-0d443867891c?ixlib=rb-4.0.3',
            'https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3'
        ],
        amenities: [
            { name: 'Wi-Fi', icon: 'wifi' },
            { name: 'Security', icon: 'shield' },
            { name: 'Water', icon: 'droplet' },
            { name: 'Shared Kitchen', icon: 'coffee' }
        ],
        reviews: [
            {
                name: 'Peter Kamau',
                rating: 4,
                text: 'Great value for money in the CBD. Very convenient location.',
                date: '2025-04-28',
                avatar: 'https://i.pravatar.cc/150?img=5'
            }
        ],
        coordinates: [-1.2867, 36.8235]
    },
    {
        id: '6',
        title: 'Modern Hostel near Daystar University',
        location: 'Athi River',
        price: 18000,
        priceUnit: 'month',
        bedrooms: 1,
        type: 'shared',
        description: 'Modern hostel with all amenities included. Features shared study areas, gaming room, and is walking distance to Daystar University.',
        image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3',
        gallery: [
            'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3',
            'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?ixlib=rb-4.0.3',
            'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3'
        ],
        amenities: [
            { name: 'Wi-Fi', icon: 'wifi' },
            { name: 'Security', icon: 'shield' },
            { name: 'Water', icon: 'droplet' },
            { name: 'Gaming Room', icon: 'tv' },
            { name: 'Study Area', icon: 'book' },
            { name: 'Laundry', icon: 'wind' }
        ],
        reviews: [
            {
                name: 'Sarah Muthoni',
                rating: 5,
                text: 'Love the gaming room and study areas! Great community.',
                date: '2025-05-05',
                avatar: 'https://i.pravatar.cc/150?img=6'
            }
        ],
        coordinates: [-1.4547, 36.9782]
    },
    {
        id: '7',
        title: 'Executive 2 Bedroom near USIU',
        location: 'Kasarani, Nairobi',
        price: 35000,
        priceUnit: 'month',
        bedrooms: 2,
        type: 'shared',
        description: 'Luxurious 2 bedroom apartment in a secure compound. Features high-speed internet, backup generator, and is perfect for USIU students.',
        image: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?ixlib=rb-4.0.3',
        gallery: [
            'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?ixlib=rb-4.0.3',
            'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3',
            'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3'
        ],
        amenities: [
            { name: 'High-Speed Wi-Fi', icon: 'wifi' },
            { name: '24/7 Security', icon: 'shield' },
            { name: 'Water', icon: 'droplet' },
            { name: 'Backup Generator', icon: 'zap' },
            { name: 'Parking', icon: 'car' },
            { name: 'Study Area', icon: 'book' }
        ],
        reviews: [
            {
                name: 'James Ochieng',
                rating: 5,
                text: 'The internet is super fast and the backup power is very reliable. Perfect for online classes!',
                date: '2025-05-10',
                avatar: 'https://i.pravatar.cc/150?img=7'
            }
        ],
        coordinates: [-1.2191, 36.8861]
    }
];