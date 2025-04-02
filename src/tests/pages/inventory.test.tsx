import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, afterEach, Mock } from "vitest";
import Inventory from "../../pages/inventory";
import { useInventory } from "../../app/hooks/useInventory";
import "@testing-library/jest-dom/vitest";

vi.mock("../../app/hooks/useInventory", () => ({
  useInventory: vi.fn(),
}));

vi.mock("../../../ui/components/InventoryItem", () => ({
  InventoryItem: vi.fn(({ item }) => (
    <li data-testid={`inventory-item-${item.id}`}>{item.name}</li>
  )),
}));

describe("Inventory Component", () => {
  const mockInventory = [
    {
      id: 1,
      brand: "Sennheiser",
      model: "e981",
      type: "microphone",
      fragility: 2,
      sector: "A",
      lastMaintenance: new Date("2023-02-08T03:00:00.000Z"),
    },
    {
      id: 2,
      brand: "Shure",
      model: "SM58",
      type: "microphone",
      fragility: 3,
      sector: "B",
      lastMaintenance: new Date("2024-01-15T03:00:00.000Z"),
    },
  ];

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should display "Loading..." when data is being loaded', () => {
    (useInventory as Mock).mockReturnValue({
      inventory: null,
      isLoading: true,
    });

    render(<Inventory />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should render the list of items when data is loaded", () => {
    (useInventory as Mock).mockReturnValue({
      inventory: mockInventory,
      isLoading: false,
    });

    render(<Inventory />);

    expect(screen.getByText(/Sennheiser/i)).toBeInTheDocument();
    expect(screen.getByText(/Shure/i)).toBeInTheDocument();
  });

  it("should not render the list when inventory is empty", () => {
    (useInventory as Mock).mockReturnValue({
      inventory: [],
      isLoading: false,
    });

    render(<Inventory />);

    const list = screen.getByRole("list");
    expect(list.children).toHaveLength(1);
  });
});
