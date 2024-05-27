// Visual and auditory variables
int RED = 11;       // Pin for the red LED
int GREEN = 9;      // Pin for the green LED
int BLUE = 10;      // Pin for the blue LED
int buzzer = 6;     // Pin for the buzzer

// Smoke Sensor Variables
int SmokeDetector = A0;          // Analog pin for the smoke detector
int MinSafe_SmokeDensity = 100;  // Minimum safe threshold for smoke density

// Temperature Sensor Variables
int TempSensor = A1;              // Analog pin for the temperature sensor
float MinSafe_Temperature = 50;  // Minimum safe threshold for temperature in Celsius

void setup() {
  // Initialization of the behavior of different components
  pinMode(RED, OUTPUT);          // Set the red LED pin as an output
  pinMode(GREEN, OUTPUT);        // Set the green LED pin as an output
  pinMode(BLUE, OUTPUT);         // Set the blue LED pin as an output
  pinMode(buzzer, OUTPUT);       // Set the buzzer pin as an output
  pinMode(SmokeDetector, INPUT); // Set the smoke detector pin as an input
  Serial.begin(9600);            // Initialize serial communication at 9600
}

void loop() {
  // Read and convert temperature sensor data
  int SensorData = analogRead(TempSensor);    
  float Voltage = 5.0 / 1024 * SensorData;    // Convert the analog reading to voltage
  float Temperature = Voltage * 100 - 50;     // Convert the voltage to temperature in Celsius

  // Read smoke level
  int SmokeLevel = analogRead(SmokeDetector);

  // Constant feedback
  Serial.print(" [?] Densidad de humo: ");
  Serial.print(SmokeLevel); Serial.println("ppm");
  Serial.print(" [?] Temperatura: ");
  Serial.print(Temperature); Serial.println("C");

  // Check alarm conditions
  if ((SmokeLevel >= MinSafe_SmokeDensity) && (Temperature > MinSafe_Temperature)) {
    Serial.println(" [!] Alarma activada");
    flashing();
    if ((SmokeLevel >= MinSafe_SmokeDensity+30) && (Temperature > MinSafe_Temperature+7) ) {
      // When a higher criticity is reached, notify the fire fighters
      Serial.println(" [!] Bomberos notificados");
    }
  } else {
    // Turn off visual and auditory alarms
    analogWrite(RED, 0);
    analogWrite(GREEN, 0);
    analogWrite(BLUE, 0);
    noTone(buzzer);
  }
  delay(100);
}


// Function for flashing LEDs and sounding buzzer in case of alarm
void flashing() {
  tone(buzzer, 300, 0);  
  analogWrite(RED, 255);
  analogWrite(GREEN, 128);
  analogWrite(BLUE, 0);
  delay(250);
  
  tone(buzzer, 280, 0);
  analogWrite(RED, 200);
  analogWrite(GREEN, 100);
  analogWrite(BLUE, 0);
  delay(250);
  
  tone(buzzer, 320, 0);
  analogWrite(RED, 150);
  analogWrite(GREEN, 200);
  analogWrite(BLUE, 0);
  delay(250);
}
