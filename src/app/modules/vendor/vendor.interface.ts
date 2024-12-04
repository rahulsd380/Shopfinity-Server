export type TVendor= {
    shopName: string;
    shopDescription?: string;
    shopLogo?: string;
    phoneNumber?: string;
    address: {
      street: string;
      city: string;
      state: string;
      country: string;
      zipCode: string;
    };
    products: string[];
    followers: string[];
    isVerified: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }
  