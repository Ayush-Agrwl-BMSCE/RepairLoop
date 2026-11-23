// src/data/productsData.js
/**
 * Demonstration Product Records for RepairLoop.
 *
 * NOTE: The data structure strictly reflects the approved MongoDB `products`
 * schema defined in the project README:
 *   - _id: Unique BSON identifier (represented as string)
 *   - serial_number: Unique manufacturer serial number (indexed)
 *   - brand: Device manufacturer
 *   - model: Device model designation
 *   - category: Product classification (Laptop, Monitor, Smartphone, etc.)
 *   - specifications: Embedded sub-document with hardware parameters
 *   - purchase_date: ISO date of initial acquisition
 *   - current_status: Operational condition (Active, Under Repair, Refurbished, Decommissioned, Recycled)
 *   - created_at: Timestamp of initial document registration
 *
 * All records below are illustrative sample data for frontend development.
 */

export const initialProducts = [
  {
    _id: '651a1b2c3d4e5f6a7b8c9d01',
    serial_number: 'SN-LPT-2024-0042',
    brand: 'ThinkClean',
    model: 'EcoBook 14',
    category: 'Laptop',
    specifications: {
      processor: 'Quad-Core Intel i5 2.4GHz',
      ram: '16 GB DDR4',
      storage: '512 GB NVMe SSD',
      other: '54 Wh Battery, 14" FHD IPS display',
    },
    purchase_date: '2023-01-15',
    current_status: 'Active',
    created_at: '2023-01-15T10:00:00Z',
  },
  {
    _id: '651a1b2c3d4e5f6a7b8c9d02',
    serial_number: 'SN-MON-2023-0118',
    brand: 'EcoDisplay',
    model: 'ProView 27',
    category: 'Monitor',
    specifications: {
      processor: 'Integrated Display Engine',
      ram: 'N/A',
      storage: 'N/A',
      other: '27" QHD (2560x1440), 75Hz, USB-C 65W PD',
    },
    purchase_date: '2023-03-20',
    current_status: 'Active',
    created_at: '2023-03-20T11:30:00Z',
  },
  {
    _id: '651a1b2c3d4e5f6a7b8c9d03',
    serial_number: 'SN-PHN-2023-0401',
    brand: 'CircularTech',
    model: 'SmartPhone X Eco',
    category: 'Smartphone',
    specifications: {
      processor: 'Octa-Core ARM Cortex',
      ram: '8 GB LPDDR5',
      storage: '128 GB UFS 3.1',
      other: '4500 mAh Modular Battery, 6.1" OLED',
    },
    purchase_date: '2023-05-10',
    current_status: 'Refurbished',
    created_at: '2023-05-10T09:15:00Z',
  },
  {
    _id: '651a1b2c3d4e5f6a7b8c9d04',
    serial_number: 'SN-DSK-2022-0312',
    brand: 'GreenCompute',
    model: 'OptiDesk Mini PC',
    category: 'Desktop',
    specifications: {
      processor: 'Hexa-Core AMD Ryzen 5',
      ram: '16 GB DDR4',
      storage: '1 TB NVMe SSD',
      other: 'Ultra-small form factor, 65W External PSU',
    },
    purchase_date: '2022-08-14',
    current_status: 'Under Repair',
    created_at: '2022-08-14T14:20:00Z',
  },
  {
    _id: '651a1b2c3d4e5f6a7b8c9d05',
    serial_number: 'SN-TAB-2023-0095',
    brand: 'ModularSlate',
    model: 'CircularTab 10',
    category: 'Tablet',
    specifications: {
      processor: 'Octa-Core 2.0GHz',
      ram: '6 GB RAM',
      storage: '128 GB Flash',
      other: '10.4" 2K Touchscreen, Stylus Support',
    },
    purchase_date: '2023-07-22',
    current_status: 'Active',
    created_at: '2023-07-22T16:00:00Z',
  },
  {
    _id: '651a1b2c3d4e5f6a7b8c9d06',
    serial_number: 'SN-PRN-2021-0067',
    brand: 'PrintLoop',
    model: 'OfficeLaser E-400',
    category: 'Printer',
    specifications: {
      processor: 'Dedicated RISC Controller',
      ram: '512 MB',
      storage: '4 GB eMMC',
      other: 'Duplex Laser, Ethernet, Remanufactured Drum',
    },
    purchase_date: '2021-11-05',
    current_status: 'Decommissioned',
    created_at: '2021-11-05T13:45:00Z',
  },
  {
    _id: '651a1b2c3d4e5f6a7b8c9d07',
    serial_number: 'SN-LPT-2022-0019',
    brand: 'ThinkClean',
    model: 'CarbonLite 13',
    category: 'Laptop',
    specifications: {
      processor: 'Intel Core i7-1165G7',
      ram: '16 GB LPDDR4x',
      storage: '512 GB SSD',
      other: 'Magnesium chassis, 48 Wh Battery',
    },
    purchase_date: '2022-02-18',
    current_status: 'Refurbished',
    created_at: '2022-02-18T10:10:00Z',
  },
  {
    _id: '651a1b2c3d4e5f6a7b8c9d08',
    serial_number: 'SN-AUD-2023-0210',
    brand: 'AcousticLoop',
    model: 'StudioClear ANC',
    category: 'Audio',
    specifications: {
      processor: 'Digital DSP Dual Core',
      ram: 'N/A',
      storage: 'N/A',
      other: 'Replaceable ear cushions, 40mm Bio-cellulose driver',
    },
    purchase_date: '2023-09-01',
    current_status: 'Active',
    created_at: '2023-09-01T15:30:00Z',
  },
  {
    _id: '651a1b2c3d4e5f6a7b8c9d09',
    serial_number: 'SN-MON-2021-0033',
    brand: 'EcoDisplay',
    model: 'SlimView 24',
    category: 'Monitor',
    specifications: {
      processor: 'Integrated Scalar',
      ram: 'N/A',
      storage: 'N/A',
      other: '23.8" FHD 60Hz, VGA/HDMI, 24W Power',
    },
    purchase_date: '2021-04-12',
    current_status: 'Recycled',
    created_at: '2021-04-12T08:00:00Z',
  },
  {
    _id: '651a1b2c3d4e5f6a7b8c9d10',
    serial_number: 'SN-LPT-2024-0088',
    brand: 'ThinkClean',
    model: 'ThinkClean E14',
    category: 'Laptop',
    specifications: {
      processor: 'AMD Ryzen 5 5625U',
      ram: '8 GB DDR4 (Upgradable)',
      storage: '256 GB SSD',
      other: '57 Wh Battery, Spill-resistant keyboard',
    },
    purchase_date: '2024-02-14',
    current_status: 'Under Repair',
    created_at: '2024-02-14T11:20:00Z',
  },
]

export const productCategories = [
  'Laptop',
  'Monitor',
  'Smartphone',
  'Tablet',
  'Desktop',
  'Printer',
  'Audio',
]

export const productStatuses = [
  'Active',
  'Under Repair',
  'Refurbished',
  'Decommissioned',
  'Recycled',
]
