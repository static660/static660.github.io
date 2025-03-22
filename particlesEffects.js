(function() {
    // Dynamically create and insert the canvas element as a background.
    const canvas = document.createElement('canvas');
    canvas.id = 'particles-js';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';          // Places the canvas behind content.
    canvas.style.pointerEvents = 'none';  // Allows interaction with elements above.
    document.body.insertBefore(canvas, document.body.firstChild);
  
    const ctx = canvas.getContext('2d');
  
    // Resize the canvas to fill the viewport.
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
  
    // Define a class representing a mini solar system.
    class Planet {
      constructor(x, y, radius, orbitRadius, orbitSpeed, satelliteRadius, planetColor) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.orbitRadius = orbitRadius; // Common orbit radius for all satellites.
        // Orbit speed is already set to half the original value.
        this.orbitSpeed = orbitSpeed;
        this.satelliteRadius = satelliteRadius;
        this.planetColor = planetColor;
        this.angle = Math.random() * Math.PI * 2;
  
        // Determine a drift for the whole solar system.
        const systemSpeedMultiplier = 50;
        const driftAngle = Math.random() * Math.PI * 2;
        this.vx = this.orbitSpeed * systemSpeedMultiplier * Math.cos(driftAngle);
        this.vy = this.orbitSpeed * systemSpeedMultiplier * Math.sin(driftAngle);
  
        // Generate satellites (2 to 4 per system).
        this.satellites = [];
        const satelliteCount = Math.floor(Math.random() * 3) + 2;
  
        // Decide if this system will include a green satellite (10% chance).
        const shouldHaveGreen = Math.random() < 0.1;
        // If so, randomly choose one index for the green satellite.
        const greenIndex = shouldHaveGreen ? Math.floor(Math.random() * satelliteCount) : -1;
  
        for (let i = 0; i < satelliteCount; i++) {
          const satAngle = Math.random() * Math.PI * 2;
          // Vary satellite speed slightly relative to the base orbit speed.
          const satSpeed = this.orbitSpeed * (0.8 + Math.random() * 0.4);
          // Only the designated satellite (if any) will be green.
          const satColor = (i === greenIndex) ? "#27ae60" : "#bdc3c7";
          this.satellites.push({
            angle: satAngle,
            speed: satSpeed,
            color: satColor
          });
        }
      }
  
      update() {
        // Update each satellite's orbit angle.
        this.satellites.forEach(sat => {
          sat.angle += sat.speed;
        });
  
        // Update the solar system's position.
        this.x += this.vx;
        this.y += this.vy;
  
        // Wrap around the screen horizontally.
        if (this.x < -this.orbitRadius) {
          this.x = canvas.width + this.orbitRadius;
        }
        if (this.x > canvas.width + this.orbitRadius) {
          this.x = -this.orbitRadius;
        }
  
        // Wrap around the screen vertically.
        if (this.y < -this.orbitRadius) {
          this.y = canvas.height + this.orbitRadius;
        }
        if (this.y > canvas.height + this.orbitRadius) {
          this.y = -this.orbitRadius;
        }
      }
  
      draw(ctx) {
        // (Optional) Draw the orbit path.
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.orbitRadius, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.stroke();
  
        // Draw the planet.
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.planetColor;
        ctx.fill();
  
        // Draw each satellite.
        this.satellites.forEach(sat => {
          const satX = this.x + this.orbitRadius * Math.cos(sat.angle);
          const satY = this.y + this.orbitRadius * Math.sin(sat.angle);
          ctx.beginPath();
          ctx.arc(satX, satY, this.satelliteRadius, 0, Math.PI * 2);
          ctx.fillStyle = sat.color;
          ctx.fill();
        });
      }
    }
  
    // Create an array of solar systems.
    const solarSystems = [];
    const numSystems = 10;
    for (let i = 0; i < numSystems; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const radius = 8 + Math.random() * 12;                // Planet size.
      const orbitRadius = radius + 20 + Math.random() * 30;   // Orbit radius.
      // Set orbitSpeed to half the original (0.01 to 0.02 becomes 0.005 to 0.01).
      const orbitSpeed = (0.01 + Math.random() * 0.02) * 0.5;
      const satelliteRadius = 3 + Math.random() * 3;          // Satellite size.
      const planetColor = "#f39c12";                          // Planet color.
      solarSystems.push(new Planet(x, y, radius, orbitRadius, orbitSpeed, satelliteRadius, planetColor));
    }
  
    // Animation loop.
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      solarSystems.forEach(system => {
        system.update();
        system.draw(ctx);
      });
      requestAnimationFrame(animate);
    }
    animate();
  })();
  