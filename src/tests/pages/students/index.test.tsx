import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
import Students from "pages/students";
import { useReservations } from "app/hooks/useReservations";
import { useRouter } from "next/router";
import "@testing-library/jest-dom/vitest";

vi.mock("app/hooks/useReservations", () => ({
  useReservations: vi.fn(),
}));

vi.mock("next/router", () => ({
  useRouter: vi.fn(),
}));

describe("Students", () => {
  const mockPush = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as Mock).mockReturnValue({ query: {}, push: mockPush });
  });

  it("should display 'Loading...' while data is being loaded", () => {
    (useReservations as Mock).mockReturnValue({
      isLoading: true,
      reservations: null,
      students: null,
    });
    render(<Students />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should display 'Student not found...' when the ID does not match a student", () => {
    (useRouter as Mock).mockReturnValue({
      query: { id: "99" },
      push: mockPush,
    });
    (useReservations as Mock).mockReturnValue({
      isLoading: false,
      students: [{ id: 1, name: "Test" }],
      reservations: [],
    });
    render(<Students />);
    expect(screen.getByText("Student not found...")).toBeInTheDocument();
  });

  it("should change the student when selecting a new one in the dropdown", async () => {
    (useRouter as Mock).mockReturnValue({ query: { id: "1" }, push: mockPush });
    (useReservations as Mock).mockReturnValue({
      isLoading: false,
      students: [
        { id: 1, name: "Test1" },
        { id: 2, name: "Test2" },
      ],
      reservations: [],
    });

    render(<Students />);
    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "2" } });

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/students/2");
    });
  });

  it("should correctly render the calendar with reservations", () => {
    (useRouter as Mock).mockReturnValue({
      query: { id: "10810" },
      push: mockPush,
    });
    (useReservations as Mock).mockReturnValue({
      isLoading: false,
      students: [{ id: 10810, name: "Arturo Stroman" }],
      reservations: [
        {
          id: 1,
          startDate: "2023-03-04T09:00:00.000Z",
          endDate: "2023-03-04T09:30:00.000Z",
          room: { id: 1, name: "Sala 13", number: 13 },
          student: { id: 10810, name: "Arturo Stroman" },
        },
      ],
    });

    render(<Students />);
    expect(screen.getByText("13 - Sala 13")).toBeInTheDocument();
  });
});
