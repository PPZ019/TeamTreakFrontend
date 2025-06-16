import React, { useState, useEffect } from "react";
import CompanyTable from "../companies/CompanyCard";
import CompanyToolbar from "../companies/CompanyForm";
import AddCompanyModal from "../companies/AddCompanyModal";

const CompanyListPage = () => {
  const [companies, setCompanies] = useState(() => {
    const saved = localStorage.getItem("companies");
    return saved ? JSON.parse(saved) : [];
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    localStorage.setItem("companies", JSON.stringify(companies));
  }, [companies]);

  const handleSearch = (term) => setSearchTerm(term);

  const handleAdd = () => {
    setShowModal(true);
  };

  const handleSaveCompany = (newCompany) => {
    const id = Date.now();
    setCompanies((prev) => [...prev, { id, ...newCompany }]);
    setShowModal(false);
  };

  const filteredCompanies = companies.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow p-6">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-xl text-blue-900 font-semibold">Company List</h2>
        </div>

        <CompanyToolbar onSearch={handleSearch} onAdd={handleAdd} />
        <CompanyTable companies={filteredCompanies} />

        {showModal && (
          <AddCompanyModal
            onClose={() => setShowModal(false)}
            onSubmit={handleSaveCompany}
          />
        )}
      </div>
    </div>
  );
};

export default CompanyListPage;


