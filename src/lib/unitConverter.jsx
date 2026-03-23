// Unit Converter Engine

const UNITS = {
  length: {
    label: "Length",
    units: {
      meter: { label: "Meter (m)", factor: 1 },
      kilometer: { label: "Kilometer (km)", factor: 1000 },
      centimeter: { label: "Centimeter (cm)", factor: 0.01 },
      millimeter: { label: "Millimeter (mm)", factor: 0.001 },
      micrometer: { label: "Micrometer (μm)", factor: 1e-6 },
      nanometer: { label: "Nanometer (nm)", factor: 1e-9 },
      mile: { label: "Mile", factor: 1609.344 },
      yard: { label: "Yard", factor: 0.9144 },
      foot: { label: "Foot", factor: 0.3048 },
      inch: { label: "Inch", factor: 0.0254 },
      nautical_mile: { label: "Nautical Mile", factor: 1852 },
      light_year: { label: "Light Year", factor: 9.461e15 },
    }
  },
  mass: {
    label: "Mass / Weight",
    units: {
      kilogram: { label: "Kilogram (kg)", factor: 1 },
      gram: { label: "Gram (g)", factor: 0.001 },
      milligram: { label: "Milligram (mg)", factor: 1e-6 },
      metric_ton: { label: "Metric Ton", factor: 1000 },
      pound: { label: "Pound (lb)", factor: 0.453592 },
      ounce: { label: "Ounce (oz)", factor: 0.0283495 },
      stone: { label: "Stone", factor: 6.35029 },
      carat: { label: "Carat", factor: 0.0002 },
    }
  },
  temperature: {
    label: "Temperature",
    units: {
      celsius: { label: "Celsius (°C)" },
      fahrenheit: { label: "Fahrenheit (°F)" },
      kelvin: { label: "Kelvin (K)" },
    },
    custom: true
  },
  area: {
    label: "Area",
    units: {
      sq_meter: { label: "Square Meter (m²)", factor: 1 },
      sq_kilometer: { label: "Square Kilometer (km²)", factor: 1e6 },
      sq_centimeter: { label: "Square Centimeter (cm²)", factor: 1e-4 },
      sq_mile: { label: "Square Mile", factor: 2.59e6 },
      sq_yard: { label: "Square Yard", factor: 0.836127 },
      sq_foot: { label: "Square Foot (ft²)", factor: 0.092903 },
      sq_inch: { label: "Square Inch (in²)", factor: 6.4516e-4 },
      hectare: { label: "Hectare", factor: 10000 },
      acre: { label: "Acre", factor: 4046.86 },
    }
  },
  volume: {
    label: "Volume",
    units: {
      liter: { label: "Liter (L)", factor: 1 },
      milliliter: { label: "Milliliter (mL)", factor: 0.001 },
      cubic_meter: { label: "Cubic Meter (m³)", factor: 1000 },
      gallon_us: { label: "Gallon (US)", factor: 3.78541 },
      gallon_uk: { label: "Gallon (UK)", factor: 4.54609 },
      quart: { label: "Quart (US)", factor: 0.946353 },
      pint: { label: "Pint (US)", factor: 0.473176 },
      cup: { label: "Cup (US)", factor: 0.236588 },
      fluid_oz: { label: "Fluid Ounce (US)", factor: 0.0295735 },
      tablespoon: { label: "Tablespoon", factor: 0.0147868 },
      teaspoon: { label: "Teaspoon", factor: 0.00492892 },
    }
  },
  speed: {
    label: "Speed",
    units: {
      mps: { label: "Meters/sec (m/s)", factor: 1 },
      kph: { label: "Kilometers/hr (km/h)", factor: 0.277778 },
      mph: { label: "Miles/hr (mph)", factor: 0.44704 },
      knot: { label: "Knot", factor: 0.514444 },
      fps: { label: "Feet/sec (ft/s)", factor: 0.3048 },
      mach: { label: "Mach", factor: 343 },
      light: { label: "Speed of Light", factor: 299792458 },
    }
  },
  time: {
    label: "Time",
    units: {
      second: { label: "Second (s)", factor: 1 },
      millisecond: { label: "Millisecond (ms)", factor: 0.001 },
      microsecond: { label: "Microsecond (μs)", factor: 1e-6 },
      minute: { label: "Minute", factor: 60 },
      hour: { label: "Hour", factor: 3600 },
      day: { label: "Day", factor: 86400 },
      week: { label: "Week", factor: 604800 },
      month: { label: "Month (30 days)", factor: 2592000 },
      year: { label: "Year (365 days)", factor: 31536000 },
    }
  },
  data: {
    label: "Data Size",
    units: {
      byte: { label: "Byte (B)", factor: 1 },
      kilobyte: { label: "Kilobyte (KB)", factor: 1024 },
      megabyte: { label: "Megabyte (MB)", factor: 1048576 },
      gigabyte: { label: "Gigabyte (GB)", factor: 1073741824 },
      terabyte: { label: "Terabyte (TB)", factor: 1099511627776 },
      petabyte: { label: "Petabyte (PB)", factor: 1125899906842624 },
      bit: { label: "Bit", factor: 0.125 },
      kilobit: { label: "Kilobit (Kb)", factor: 128 },
      megabit: { label: "Megabit (Mb)", factor: 131072 },
      gigabit: { label: "Gigabit (Gb)", factor: 134217728 },
    }
  },
  energy: {
    label: "Energy",
    units: {
      joule: { label: "Joule (J)", factor: 1 },
      kilojoule: { label: "Kilojoule (kJ)", factor: 1000 },
      calorie: { label: "Calorie (cal)", factor: 4.184 },
      kilocalorie: { label: "Kilocalorie (kcal)", factor: 4184 },
      watt_hour: { label: "Watt Hour (Wh)", factor: 3600 },
      kilowatt_hour: { label: "Kilowatt Hour (kWh)", factor: 3600000 },
      electron_volt: { label: "Electron Volt (eV)", factor: 1.602e-19 },
      btu: { label: "BTU", factor: 1055.06 },
    }
  },
  pressure: {
    label: "Pressure",
    units: {
      pascal: { label: "Pascal (Pa)", factor: 1 },
      kilopascal: { label: "Kilopascal (kPa)", factor: 1000 },
      bar: { label: "Bar", factor: 100000 },
      atmosphere: { label: "Atmosphere (atm)", factor: 101325 },
      psi: { label: "PSI", factor: 6894.76 },
      mmhg: { label: "mmHg (Torr)", factor: 133.322 },
    }
  },
  angle: {
    label: "Angle",
    units: {
      degree: { label: "Degree (°)", factor: 1 },
      radian: { label: "Radian (rad)", factor: 57.2958 },
      gradian: { label: "Gradian (grad)", factor: 0.9 },
      arcminute: { label: "Arcminute (')", factor: 1/60 },
      arcsecond: { label: 'Arcsecond (")', factor: 1/3600 },
      turn: { label: "Turn", factor: 360 },
    }
  }
};

function convertTemperature(value, from, to) {
  let celsius;
  switch (from) {
    case 'celsius': celsius = value; break;
    case 'fahrenheit': celsius = (value - 32) * 5/9; break;
    case 'kelvin': celsius = value - 273.15; break;
    default: return NaN;
  }
  switch (to) {
    case 'celsius': return celsius;
    case 'fahrenheit': return celsius * 9/5 + 32;
    case 'kelvin': return celsius + 273.15;
    default: return NaN;
  }
}

export function convert(category, value, fromUnit, toUnit) {
  if (category === 'temperature') {
    return convertTemperature(value, fromUnit, toUnit);
  }
  const cat = UNITS[category];
  if (!cat) return NaN;
  const fromFactor = cat.units[fromUnit]?.factor;
  const toFactor = cat.units[toUnit]?.factor;
  if (fromFactor == null || toFactor == null) return NaN;
  return (value * fromFactor) / toFactor;
}

export function getCategories() {
  return Object.entries(UNITS).map(([key, val]) => ({ key, label: val.label }));
}

export function getUnits(category) {
  const cat = UNITS[category];
  if (!cat) return [];
  return Object.entries(cat.units).map(([key, val]) => ({ key, label: val.label }));
}

export function formatResult(num) {
  if (typeof num !== 'number' || isNaN(num)) return 'Error';
  if (!isFinite(num)) return num > 0 ? '∞' : '-∞';
  if (Math.abs(num) < 0.000001 && num !== 0) return num.toExponential(6);
  if (Math.abs(num) > 1e12) return num.toExponential(6);
  return parseFloat(num.toPrecision(10)).toString();
}