import React, { useState, useEffect } from "react";
import axios from "axios";
import CompanyTable from "../companies/CompanyCard";
import CompanyToolbar from "../companies/CompanyForm";
import AddCompanyModal from "../companies/AddCompanyModal";

const API_BASE = "http://localhost:5500"; // Update if using a different port or deployment URL

const CompanyListPage = () => {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);

  const fetchCompanies = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/company`);
      setCompanies(res.data.result);
    } catch (err) {
      console.error("Error fetching companies:", err);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleSearch = (term) => setSearchTerm(term);

  const handleAdd = () => setShowModal(true);

  const handleSaveCompany = async (newCompany) => {
    try {
      const res = await axios.post(`${API_BASE}/api/company`, newCompany);
      setCompanies((prev) => [...prev, res.data.result]);
      setShowModal(false);
    } catch (err) {
      console.error("Failed to add company:", err);
    }
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
