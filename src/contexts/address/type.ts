export interface AddressType {
  name: string;
  id: number;
  mobile: string;
  address: string;
  email: string;
  address_type: string;
  city_id: number;
  region_id: number;
  area_id: number;
  zone_id: number;
  region_name: string;
  city_name: string;
  zone_name: string;
  area_name: string;
  region: RegionType;
  city: CityType;
  zone: ZoneType;
  area: AreaType;
}

export interface RegionType {
  name: string;
  id: number;
  title: string;
}

export interface CityType {
  name: string;
  id: number;
  title: string;
}

export interface ZoneType {
  name: string;
  id: number;
  title: string;
}

export interface AreaType {
  name: string;
  id: number;
  title: string;
}
