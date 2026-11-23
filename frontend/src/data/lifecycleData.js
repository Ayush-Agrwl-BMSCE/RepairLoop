// src/data/lifecycleData.js
/**
 * Demonstration Lifecycle Milestone Records for RepairLoop.
 *
 * NOTE: The data structure strictly reflects the approved MongoDB `lifecycle_events`
 * schema defined in the project README:
 *   - _id: Unique BSON identifier (represented as string)
 *   - product_id: Reference BSON identifier pointing to products collection
 *   - event_type: Milestone category ('Purchased', 'Refurbished', 'Ownership Transfer', 'Decommissioned', 'Recycled')
 *   - event_date: ISO date of milestone completion
 *   - location: Facility, campus, or department location
 *   - recorded_by: Person or role logging the milestone
 *   - notes: Detailed qualitative remarks about the lifecycle transition
 *
 * All records below are illustrative sample data for frontend development.
 */

import { ShoppingBag, ArrowRightLeft, RotateCcw, Archive, Recycle, Milestone } from 'lucide-react'

export const initialLifecycleEvents = [
  // 1. ThinkClean EcoBook 14 (651a1b2c3d4e5f6a7b8c9d01)
  {
    _id: '651a3d4e5f6a7b8c9d0301',
    product_id: '651a1b2c3d4e5f6a7b8c9d01',
    event_type: 'Purchased',
    event_date: '2023-01-15T10:00:00Z',
    location: 'Central IT Procurement Depot, Bangalore',
    recorded_by: 'Admin Store Manager',
    notes: 'Initial procurement and registry enrollment. Delivered with 3-year OEM commercial warranty.',
  },
  {
    _id: '651a3d4e5f6a7b8c9d0302',
    product_id: '651a1b2c3d4e5f6a7b8c9d01',
    event_type: 'Ownership Transfer',
    event_date: '2023-08-10T14:30:00Z',
    location: 'Computer Science Department, Block A',
    recorded_by: 'Ramesh Gupta (Asset Custodian)',
    notes: 'Assigned as primary faculty workstation for data science laboratory sessions.',
  },
  {
    _id: '651a3d4e5f6a7b8c9d0303',
    product_id: '651a1b2c3d4e5f6a7b8c9d01',
    event_type: 'Refurbished',
    event_date: '2024-03-12T09:00:00Z',
    location: 'Central Campus IT Depot',
    recorded_by: 'Alex Kumar (Lead Technician)',
    notes: 'Full diagnostic battery testing completed post-repair; certified with 95% battery health and reissued for student library kiosk pool.',
  },

  // 2. EcoDisplay ProView 27 (651a1b2c3d4e5f6a7b8c9d02)
  {
    _id: '651a3d4e5f6a7b8c9d0304',
    product_id: '651a1b2c3d4e5f6a7b8c9d02',
    event_type: 'Purchased',
    event_date: '2023-03-20T11:30:00Z',
    location: 'Central IT Procurement Depot, Bangalore',
    recorded_by: 'Admin Store Manager',
    notes: 'Acquired for high-resolution graphics and visualization cluster workstation.',
  },
  {
    _id: '651a3d4e5f6a7b8c9d0305',
    product_id: '651a1b2c3d4e5f6a7b8c9d02',
    event_type: 'Ownership Transfer',
    event_date: '2023-09-05T16:00:00Z',
    location: 'Digital Media Studio, Floor 3',
    recorded_by: 'Priya Sharma (Media Tech)',
    notes: 'Custody transferred from general IT storage to active multimedia authoring studio.',
  },

  // 3. CircularTech SmartPhone X Eco (651a1b2c3d4e5f6a7b8c9d03)
  {
    _id: '651a3d4e5f6a7b8c9d0306',
    product_id: '651a1b2c3d4e5f6a7b8c9d03',
    event_type: 'Purchased',
    event_date: '2023-05-10T09:15:00Z',
    location: 'Campus Mobile Device Store',
    recorded_by: 'Logistics Lead',
    notes: 'Purchased as a field inspection pilot unit emphasizing modular repairability.',
  },
  {
    _id: '651a3d4e5f6a7b8c9d0307',
    product_id: '651a1b2c3d4e5f6a7b8c9d03',
    event_type: 'Ownership Transfer',
    event_date: '2023-11-15T11:00:00Z',
    location: 'Environmental Sciences Field Research Cell',
    recorded_by: 'Anita Nair (Research Coord)',
    notes: 'Reassigned for biodiversity telemetry logging and campus carbon footprint sensor mapping.',
  },
  {
    _id: '651a3d4e5f6a7b8c9d0308',
    product_id: '651a1b2c3d4e5f6a7b8c9d03',
    event_type: 'Refurbished',
    event_date: '2024-01-28T15:45:00Z',
    location: 'GreenTech Mobile Lab',
    recorded_by: 'Vikram Das (Service Specialist)',
    notes: 'OLED screen and perimeter gasket replaced; water-tight integrity verified. Cleared for secondary field deployment.',
  },

  // 4. PrintLoop OfficeLaser E-400 (651a1b2c3d4e5f6a7b8c9d06)
  {
    _id: '651a3d4e5f6a7b8c9d0309',
    product_id: '651a1b2c3d4e5f6a7b8c9d06',
    event_type: 'Purchased',
    event_date: '2021-11-05T13:45:00Z',
    location: 'Allied Office Supplies Distributors',
    recorded_by: 'Procurement Officer',
    notes: 'High-throughput duplex departmental printer installed in administrative hub.',
  },
  {
    _id: '651a3d4e5f6a7b8c9d0310',
    product_id: '651a1b2c3d4e5f6a7b8c9d06',
    event_type: 'Ownership Transfer',
    event_date: '2022-06-20T10:00:00Z',
    location: 'Student Affairs Administrative Office',
    recorded_by: 'Kavita Rao (Admin Supervisor)',
    notes: 'Shifted from academic dean office to student service counter.',
  },
  {
    _id: '651a3d4e5f6a7b8c9d0311',
    product_id: '651a1b2c3d4e5f6a7b8c9d06',
    event_type: 'Decommissioned',
    event_date: '2024-01-10T14:15:00Z',
    location: 'E-Waste Consolidation Warehouse',
    recorded_by: 'Suresh Patil (Hardware Auditor)',
    notes: 'Exceeded maximum designed print cycle duty limit (250,000 pages). Decommissioned from fleet with components tagged for harvesting.',
  },

  // 5. ThinkClean CarbonLite 13 (651a1b2c3d4e5f6a7b8c9d07)
  {
    _id: '651a3d4e5f6a7b8c9d0312',
    product_id: '651a1b2c3d4e5f6a7b8c9d07',
    event_type: 'Purchased',
    event_date: '2022-02-18T10:10:00Z',
    location: 'Direct Enterprise Channel, Pune',
    recorded_by: 'Admin Store Manager',
    notes: 'Enrolled in executive mobility program with magnesium alloy chassis specification.',
  },
  {
    _id: '651a3d4e5f6a7b8c9d0313',
    product_id: '651a1b2c3d4e5f6a7b8c9d07',
    event_type: 'Ownership Transfer',
    event_date: '2023-04-05T09:30:00Z',
    location: 'Digital Library Terminal 4',
    recorded_by: 'Sunil Verma (Librarian)',
    notes: 'Reassigned from executive loaner inventory to digital reference reading room.',
  },
  {
    _id: '651a3d4e5f6a7b8c9d0314',
    product_id: '651a1b2c3d4e5f6a7b8c9d07',
    event_type: 'Refurbished',
    event_date: '2023-11-25T17:00:00Z',
    location: 'Campus Electronics Repair Lab',
    recorded_by: 'Alex Kumar (Lead Technician)',
    notes: 'Spill-damaged keyboard assembly replaced. Ultrasonic cleaning applied to motherboard and keyboard membrane.',
  },

  // 6. EcoDisplay SlimView 24 (651a1b2c3d4e5f6a7b8c9d09)
  {
    _id: '651a3d4e5f6a7b8c9d0315',
    product_id: '651a1b2c3d4e5f6a7b8c9d09',
    event_type: 'Purchased',
    event_date: '2021-04-12T08:00:00Z',
    location: 'DisplayTech Distributors, Bangalore',
    recorded_by: 'Admin Store Manager',
    notes: 'Standard 24-inch desk monitor deployed for faculty office desk.',
  },
  {
    _id: '651a3d4e5f6a7b8c9d0316',
    product_id: '651a1b2c3d4e5f6a7b8c9d09',
    event_type: 'Decommissioned',
    event_date: '2023-10-15T12:00:00Z',
    location: 'Campus Resource Recovery Bay',
    recorded_by: 'Rohan Mehta (Facilities Lead)',
    notes: 'Backlight inverter burned out after 7,500 active power-on hours. Removed from active equipment roster.',
  },
  {
    _id: '651a3d4e5f6a7b8c9d0317',
    product_id: '651a1b2c3d4e5f6a7b8c9d09',
    event_type: 'Recycled',
    event_date: '2024-02-20T11:00:00Z',
    location: 'EcoRecover Certified E-Waste Facility',
    recorded_by: 'GreenRecycle Logistics Partner',
    notes: 'Sent to certified recycler for non-ferrous copper recovery, shredded PCB metals extraction, and safe glass treatment adhering to SDG 12.5.',
  },
]

export const lifecycleEventTypes = [
  'Purchased',
  'Ownership Transfer',
  'Refurbished',
  'Decommissioned',
  'Recycled',
]

export function getEventBadge(eventType) {
  switch (eventType) {
    case 'Purchased':
      return {
        className: 'event-badge event-purchased',
        icon: ShoppingBag,
      }
    case 'Ownership Transfer':
      return {
        className: 'event-badge event-transfer',
        icon: ArrowRightLeft,
      }
    case 'Refurbished':
      return {
        className: 'event-badge event-refurbished',
        icon: RotateCcw,
      }
    case 'Decommissioned':
      return {
        className: 'event-badge event-decommissioned',
        icon: Archive,
      }
    case 'Recycled':
      return {
        className: 'event-badge event-recycled',
        icon: Recycle,
      }
    default:
      return {
        className: 'event-badge',
        icon: Milestone,
      }
  }
}
