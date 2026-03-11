export default function Navbar() {
  return (
    <header className="navbar">
      <div className="logo-box">
        <div className="logo-icon">🥗</div>
        <span className="logo-text">SmartDiet Hub</span>
      </div>

      <nav className="nav-links">
        <a href="#hero">Home</a>
        <a href="#kitchen">Kitchen</a>
        <a href="#allergy">Allergy</a>
        <a href="#social">Videos</a>
      </nav>
    </header>
  );
}