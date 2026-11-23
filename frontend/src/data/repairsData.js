// src/data/repairsData.js
/**
 * Demonstration Repair Records for RepairLoop.
 *
 * NOTE: The data structure strictly reflects the approved MongoDB `repair_events`
 * schema defined in the project README:
 *   - _id: Unique BSON identifier (represented as string)
 *   - product_id: Reference BSON identifier pointing to products collection
 *   - repair_date: ISO date of repair completion
 *   - service_center: Facility or workshop name
 *   - technician_name: Servicing technician name or identifier
 *   - fault_description: User or operator reported problem
 *   - diagnosis: Root-cause diagnostic finding
 *   - parts_replaced: Array of embedded component sub-documents
 *       - part_name: Component title
 *       - part_number: Manufacturer or catalog part code
 *       - cost: Numeric component price in INR
 *   - labor_cost: Technician service fee in INR
 *   - total_cost: Combined cost (labor_cost + sum of parts_replaced.cost)
 *   - outcome: Service result ('Successful', 'Partial', 'Unrepairable')
 *
 * All records below are illustrative sample data for frontend development.
 */

export const initialRepairs = [
  {
    _id: '651a2c3d4e5f6a7b8c9d0201',
    product_id: '651a1b2c3d4e5f6a7b8c9d01', // ThinkClean EcoBook 14 (SN-LPT-2024-0042)
    repair_date: '2024-03-10',
    service_center: 'Campus Electronics Repair Lab',
    technician_name: 'Alex Kumar',
    fault_description: 'Laptop battery drains in less than 30 minutes under normal workload',
    diagnosis: 'Severe chemical battery degradation; maximum hold capacity reduced to 42%',
    parts_replaced: [
      {
        part_name: 'Replacement Battery Pack 54Wh',
        part_number: 'BAT-54WH-EB14',
        cost: 3200,
      },
    ],
    labor_cost: 800,
    total_cost: 4000,
    outcome: 'Successful',
  },
  {
    _id: '651a2c3d4e5f6a7b8c9d0202',
    product_id: '651a1b2c3d4e5f6a7b8c9d02', // EcoDisplay ProView 27 (SN-MON-2023-0118)
    repair_date: '2024-02-18',
    service_center: 'Metro Display Care Center',
    technician_name: 'Priya Sharma',
    fault_description: 'Intermittent display flickering and loss of signal on USB-C input',
    diagnosis: 'Faulty USB-C Power Delivery controller capacitor on interface daughterboard',
    parts_replaced: [
      {
        part_name: 'Interface I/O Daughterboard',
        part_number: 'IO-PV27-REV3',
        cost: 2400,
      },
    ],
    labor_cost: 1100,
    total_cost: 3500,
    outcome: 'Successful',
  },
  {
    _id: '651a2c3d4e5f6a7b8c9d0203',
    product_id: '651a1b2c3d4e5f6a7b8c9d03', // CircularTech SmartPhone X Eco (SN-PHN-2023-0401)
    repair_date: '2024-01-25',
    service_center: 'GreenTech Mobile Solutions',
    technician_name: 'Vikram Das',
    fault_description: 'Shattered front glass and unresponsive touch digitizer along lower half',
    diagnosis: 'Physical impact fracture of outer glass with severed digitizer ribbon cable',
    parts_replaced: [
      {
        part_name: '6.1" OLED Display Assembly',
        part_number: 'DSP-SPX-061',
        cost: 4200,
      },
      {
        part_name: 'Water-Resistant Adhesive Gasket',
        part_number: 'GSK-SPX-WT',
        cost: 300,
      },
    ],
    labor_cost: 1500,
    total_cost: 6000,
    outcome: 'Successful',
  },
  {
    _id: '651a2c3d4e5f6a7b8c9d0204',
    product_id: '651a1b2c3d4e5f6a7b8c9d04', // GreenCompute OptiDesk Mini PC (SN-DSK-2022-0312)
    repair_date: '2024-02-05',
    service_center: 'Campus IT Infrastructure Hub',
    technician_name: 'Rohan Mehta',
    fault_description: 'System fan runs at max RPM continuously; CPU thermal throttling observed',
    diagnosis: 'Blower fan sleeve bearing seized and thermal compound completely desiccated',
    parts_replaced: [
      {
        part_name: 'Brushless Radial Cooling Fan',
        part_number: 'FAN-ODSK-65W',
        cost: 950,
      },
      {
        part_name: 'High-Conductivity Thermal Compound',
        part_number: 'TP-ARCTIC-4G',
        cost: 250,
      },
    ],
    labor_cost: 600,
    total_cost: 1800,
    outcome: 'Successful',
  },
  {
    _id: '651a2c3d4e5f6a7b8c9d0205',
    product_id: '651a1b2c3d4e5f6a7b8c9d05', // ModularSlate CircularTab 10 (SN-TAB-2023-0095)
    repair_date: '2024-03-01',
    service_center: 'GreenTech Mobile Solutions',
    technician_name: 'Vikram Das',
    fault_description: 'Touchscreen intermittently registers ghost inputs along the left border',
    diagnosis: 'Perimeter substrate micro-fracture; digitizer recalibrated with remaining dead zone',
    parts_replaced: [],
    labor_cost: 1200,
    total_cost: 1200,
    outcome: 'Partial',
  },
  {
    _id: '651a2c3d4e5f6a7b8c9d0206',
    product_id: '651a1b2c3d4e5f6a7b8c9d06', // PrintLoop OfficeLaser E-400 (SN-PRN-2021-0067)
    repair_date: '2023-12-14',
    service_center: 'Allied Office Automation',
    technician_name: 'Suresh Patil',
    fault_description: 'Frequent paper jam error 13.02 accompanied by mechanical grinding sound',
    diagnosis: 'Pick-up roller rubber hardened and worn smooth; primary drive gear teeth stripped',
    parts_replaced: [
      {
        part_name: 'Paper Pick-up Roller Kit',
        part_number: 'RLR-PRN-400',
        cost: 850,
      },
      {
        part_name: 'Intermediate Drive Gear 28T',
        part_number: 'GR-PRN-28T',
        cost: 450,
      },
    ],
    labor_cost: 900,
    total_cost: 2200,
    outcome: 'Successful',
  },
  {
    _id: '651a2c3d4e5f6a7b8c9d0207',
    product_id: '651a1b2c3d4e5f6a7b8c9d07', // ThinkClean CarbonLite 13 (SN-LPT-2022-0019)
    repair_date: '2023-11-20',
    service_center: 'Campus Electronics Repair Lab',
    technician_name: 'Alex Kumar',
    fault_description: 'Liquid spill on keyboard; spacebar and multiple letter keys non-functional',
    diagnosis: 'Key matrix shorted by dried mineral deposits; trackpad click mechanism sluggish',
    parts_replaced: [
      {
        part_name: 'Replacement Backlit Keyboard Assembly',
        part_number: 'KB-CL13-BL',
        cost: 2100,
      },
    ],
    labor_cost: 1400,
    total_cost: 3500,
    outcome: 'Partial',
  },
  {
    _id: '651a2c3d4e5f6a7b8c9d0208',
    product_id: '651a1b2c3d4e5f6a7b8c9d08', // AcousticLoop StudioClear ANC (SN-AUD-2023-0210)
    repair_date: '2024-01-12',
    service_center: 'AudioLab Precision Acoustics',
    technician_name: 'Ananya Roy',
    fault_description: 'Right audio channel distorts heavily at low frequencies with buzzing',
    diagnosis: 'Detached voice coil on 40mm bio-cellulose dynamic transducer',
    parts_replaced: [
      {
        part_name: '40mm Bio-Cellulose Driver Unit',
        part_number: 'DRV-40MM-BIO',
        cost: 1650,
      },
    ],
    labor_cost: 750,
    total_cost: 2400,
    outcome: 'Successful',
  },
  {
    _id: '651a2c3d4e5f6a7b8c9d0209',
    product_id: '651a1b2c3d4e5f6a7b8c9d10', // ThinkClean ThinkClean E14 (SN-LPT-2024-0088)
    repair_date: '2024-02-28',
    service_center: 'Campus Electronics Repair Lab',
    technician_name: 'Alex Kumar',
    fault_description: 'Device completely dead following severe thunderstorm electrical surge',
    diagnosis: 'Catastrophic dielectric breakdown of motherboard multilayer PCB; SoC destroyed',
    parts_replaced: [],
    labor_cost: 500,
    total_cost: 500,
    outcome: 'Unrepairable',
  },
]

export const repairOutcomes = ['Successful', 'Partial', 'Unrepairable']
